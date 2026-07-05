// Tabela genérica do admin. columns: [{ key, header, align, render }].
export default function DataTable({ columns, rows, getKey }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-cobalt-tint/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-muted ${
                  col.align === "right" ? "text-right" : ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getKey ? getKey(row) : i}
              className="border-b border-line last:border-0 hover:bg-cobalt-tint/20"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-[14px] text-ink ${
                    col.align === "right" ? "text-right" : ""
                  }`}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
