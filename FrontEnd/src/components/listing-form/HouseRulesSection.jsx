export default function HouseRulesSection({
  houseRules,
  ruleInput,
  setRuleInput,
  handleAddRule,
  handleRemoveRule,
}) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        House Rules
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Add rules that guests should follow.
      </p>

      <div className="mt-8 flex gap-3">
        <input
          type="text"
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          placeholder="Example: No smoking"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
        />

        <button
          type="button"
          onClick={handleAddRule}
          className="rounded-xl bg-slate-900 px-5 text-white hover:bg-slate-800"
        >
          Add
        </button>
      </div>

      {houseRules.length > 0 && (
        <div className="mt-8 space-y-3">
          {houseRules.map((rule) => (
            <div
              key={rule}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <span>{rule}</span>

              <button
                type="button"
                onClick={() => handleRemoveRule(rule)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}