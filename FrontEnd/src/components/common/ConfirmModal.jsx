export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {message}
          </p>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="rounded-xl border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelText}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className={`rounded-xl px-5 py-2 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-red-300"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Deleting..." : confirmText}
            </button>

          </div>

        </div>
      </div>
    </>
  );
}