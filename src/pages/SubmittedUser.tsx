import { useLocation, Link } from "react-router-dom";

export default function SubmittedUser() {
  const { state } = useLocation() as {
    state: {
      fullName: string;
      email: string;
      password: string;
      rememberMe?: boolean;
    };
  };

  if (!state) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-gray-900 text-white">
        <p>No user data found. <Link to="/create" className="underline">Go back</Link></p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">User Card</h2>

        <div className="space-y-3 text-sm">
          <Row label="Full Name" value={state.fullName} />
          <Row label="Email" value={state.email} />
          <Row label="Password" value={state.password} />
          <Row
            label="Remember Me"
            value={state.rememberMe ? "Yes" : "No"}
          />
        </div>

        <Link
          to="/create"
          className="block w-full mt-8 text-center bg-blue-600 hover:bg-blue-700 py-2 rounded-md"
        >
          Back to Form
        </Link>
      </div>
    </div>
  );
}

/* ---------------- Helper component ---------------- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-700 pb-2">
      <span className="font-medium text-gray-300">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
