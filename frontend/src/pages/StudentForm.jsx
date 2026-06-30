return (
  <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">

    {/* BACKGROUND IMAGE */}
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')"
      }}
    ></div>

    {/* DARK OVERLAY */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

    {/* FORM */}
    <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-md rounded-xl p-8 w-full max-w-md">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Add Student</h1>
        <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline">
          ← Back to dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          placeholder="Class"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Save Student
        </button>
      </form>

    </div>
  </div>
);