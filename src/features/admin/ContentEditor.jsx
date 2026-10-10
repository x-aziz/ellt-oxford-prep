import { useState } from "react";

/**
 * Generic admin editor used for mocks, drills and full tests. Simple scalar
 * fields (title, focus, order…) get real inputs; the deeply-nested parts (a
 * mock's three sections, a drill set's items) are edited as raw JSON in a
 * textarea   this keeps one editor working for every question type without
 * building bespoke UI for each.
 *
 * Props:
 *   title           heading shown above the list
 *   items           array from useMocks()/useDrills()/useTests() (each has .docId)
 *   loading         bool
 *   scalarFields    [{ key, label, type: 'text'|'number'|'textarea'|'select', options? }]
 *                   for 'select': options = [{ value, label }]; an empty value saves as null
 *   jsonFields      array of field names to edit together as one JSON blob
 *                   (pass [] to hide the JSON box, e.g. for Full Tests)
 *   listLabel(item) -> string shown per row in the list
 *   newTemplate     object used to pre-fill the "new" form
 *   onSave(item)    -> Promise
 *   onDelete(docId) -> Promise
 */
export default function ContentEditor({
  title,
  items,
  loading,
  scalarFields,
  jsonFields,
  listLabel,
  newTemplate,
  onSave,
  onDelete,
}) {
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState({});
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [saving, setSaving] = useState(false);

  const hasJson = jsonFields.length > 0;

  function startNew() {
    setForm({ ...newTemplate });
    setJsonText(
      hasJson ? JSON.stringify(pick(newTemplate, jsonFields), null, 2) : "{}",
    );
    setJsonError("");
    setEditing("new");
  }
  function startEdit(item) {
    setForm({ ...item });
    setJsonText(
      hasJson ? JSON.stringify(pick(item, jsonFields), null, 2) : "{}",
    );
    setJsonError("");
    setEditing(item);
  }
  function cancel() {
    setEditing(null);
    setJsonError("");
  }

  async function save() {
    let parsed = {};
    if (hasJson) {
      try {
        parsed = JSON.parse(jsonText);
      } catch (e) {
        setJsonError("Invalid JSON: " + e.message);
        return;
      }
    }
    setJsonError("");
    setSaving(true);
    try {
      const payload = { ...form, ...parsed };
      if (editing !== "new") payload.docId = editing.docId;
      await onSave(payload);
      setEditing(null);
    } catch (e) {
      console.error("save failed", e);
      setJsonError("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(item) {
    if (
      !window.confirm(
        "Delete this permanently? Students will no longer see it.",
      )
    )
      return;
    try {
      await onDelete(item.docId);
    } catch (e) {
      console.error("delete failed", e);
      alert("Delete failed: " + e.message);
    }
  }

  function renderField(f) {
    const value = form[f.key] ?? "";
    if (f.type === "textarea") {
      return (
        <textarea
          rows={2}
          value={value}
          onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
        />
      );
    }
    if (f.type === "select") {
      return (
        <select
          value={
            form[f.key] === null || form[f.key] === undefined
              ? ""
              : String(form[f.key])
          }
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              [f.key]: e.target.value === "" ? null : Number(e.target.value),
            }))
          }
        >
          {(f.options || []).map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    return (
      <input
        type={f.type === "number" ? "number" : "text"}
        value={value}
        onChange={(e) =>
          setForm((p) => ({
            ...p,
            [f.key]:
              f.type === "number" ? Number(e.target.value) : e.target.value,
          }))
        }
      />
    );
  }

  return (
    <div>
      <div className="adm-head-row">
        <h2>{title}</h2>
        <button className="tcy-btn-gold" onClick={startNew}>
          + New
        </button>
      </div>

      {loading && <div className="adm-empty">Loading…</div>}
      {!loading && items.length === 0 && (
        <div className="adm-empty">
          Nothing here yet click "+ New" to add one.
        </div>
      )}

      <div className="adm-list">
        {items.map((item) => (
          <div className="adm-row" key={item.docId}>
            <span className="adm-row-label">{listLabel(item)}</span>
            <div className="adm-row-actions">
              <button className="tcy-btn-gray" onClick={() => startEdit(item)}>
                Edit
              </button>
              <button className="adm-danger" onClick={() => remove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div
          className="tcy-overlay"
          onClick={(e) => e.target === e.currentTarget && cancel()}
        >
          <div className="adm-modal">
            <h3>
              {editing === "new" ? "New" : "Edit"} {title}
            </h3>

            <div className="adm-form-grid">
              {scalarFields.map((f) => (
                <label
                  key={f.key}
                  className={
                    "adm-field" + (f.type === "textarea" ? " wide" : "")
                  }
                >
                  <span>{f.label}</span>
                  {renderField(f)}
                </label>
              ))}
            </div>

            {hasJson && (
              <label className="adm-field wide">
                <span>Content data ({jsonFields.join(", ")}) raw JSON</span>
                <textarea
                  className="adm-json"
                  rows={18}
                  spellCheck={false}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                />
              </label>
            )}
            {jsonError && <div className="adm-error">{jsonError}</div>}

            <div className="adm-modal-btns">
              <button
                className="tcy-btn-gray"
                onClick={cancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button className="tcy-btn-gold" onClick={save} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function pick(obj, keys) {
  const out = {};
  keys.forEach((k) => {
    out[k] = obj?.[k];
  });
  return out;
}
