import React, { useEffect, useState } from "react";

const API = "http://localhost:3000";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/enroll/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        console.log("Dashboard enrollments:", data.info);

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setEnrollments(data.information||[]);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="font-medium text-gray-900">
            Loading dashboard...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Getting your courses and activity
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-700">
          Failed to load dashboard
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Here's what's happening with your courses.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            Enrolled Courses
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {enrollments.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            0
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            Upcoming
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            0
          </p>
        </div>

      </div>

      {/* Courses */}
      <div className="rounded-xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            My Courses
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your current enrollments
          </p>
        </div>

        {enrollments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              You are not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between px-6 py-5"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    Course #{enrollment.course_id}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Enrollment #{enrollment.id}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Enrolled
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}