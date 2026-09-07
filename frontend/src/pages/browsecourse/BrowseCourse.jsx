import React, { useEffect, useState } from "react";
import { courseGet } from "../../api/course/course.get";
import { enrollCourse } from "../../api/course/register.course";
import Loading from "../../components/Loading";

export default function BrowseCourse() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await courseGet();

        console.log("Courses:", data);

        setCourses(data.data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const closeModal = () => {
    if (enrolling) return;

    setModalOpen(false);
    setSelectedCourse(null);
  };

const handleEnroll = async () => {
  try {
    setEnrolling(true);
    setError("");
    setSuccess("");

    const data = await enrollCourse(selectedCourse.id);

    console.log("Enrollment response:", data);

    setSuccess("Enrollment successful!");

    setTimeout(() => {
      setModalOpen(false);
      setSelectedCourse(null);
      setSuccess("");
    }, 1000);

  } catch (error) {
    console.error("Failed to enroll:", error);
    setError(error.message);
  } finally {
    setEnrolling(false);
  }
};

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Browse Courses
        </h1>

        <p className="mt-1 text-gray-500">
          Find courses you want to study.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            No courses found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
            key={course.id}
            className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {course.name}
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                  {course.status}
                </span>
              </div>

              <p className="text-sm leading-6 text-gray-500">
                {course.description}
              </p>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <p>
                  Location:{" "}
                  <span className="font-medium text-gray-900">
                    {course.location}
                  </span>
                </p>

                <p>
                  Capacity:{" "}
                  <span className="font-medium text-gray-900">
                    {course.capacity}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCourse(course);
                  setModalOpen(true);
                }}
                className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
          {success && (
            <div className="mb-5 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
            
              </div>
          
              <div>
                <p className="font-semibold">
                  Enrollment successful!
                </p>
          
                <p className="text-sm text-green-600">
                  You have been enrolled in this course.
                </p>
              </div>
            </div>
          )}
                <h2 className="text-xl font-semibold text-gray-900">
                  Enroll in Course
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review the course before enrolling.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={enrolling}
                className="text-xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">
                  Course
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCourse.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedCourse.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Capacity
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedCourse.capacity}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={enrolling}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleEnroll}
                disabled={enrolling}
                className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {enrolling ? "Enrolling..." : "Confirm Enrollment"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}