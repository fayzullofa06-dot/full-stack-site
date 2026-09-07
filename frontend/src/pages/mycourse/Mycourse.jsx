import React, { useEffect, useState } from "react";
import { getMyCourses } from "../../api/course/coures.getMe";
import { deleteEnrollment } from "../../api/course/update.course";
import Loading from "../../components/Loading";

export default function Mycourse() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        const data = await getMyCourses();

        console.log("My courses:", data);

        setCourses(data.information || []);
      } catch (error) {
        console.error("Failed to get my courses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyCourses();
  }, []);

  const openModal = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setModalOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    if (deleting) return;

    setModalOpen(false);
    setSelectedEnrollment(null);
  };

  const handleUnenroll = async () => {
    try {
      setDeleting(true);
      setError("");

      await deleteEnrollment(selectedEnrollment.id);

      setCourses((prevCourses) =>
        prevCourses.filter(
          (course) => course.id !== selectedEnrollment.id
        )
      );

      setSuccess("You have been unenrolled successfully.");

      setTimeout(() => {
        setModalOpen(false);
        setSelectedEnrollment(null);
        setSuccess("");
      }, 1000);

    } catch (error) {
      console.error("Failed to unenroll:", error);
      setError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && !modalOpen) {
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
          My Courses
        </h1>

        <p className="mt-1 text-gray-500">
          Courses you are currently enrolled in.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            You are not enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((enrollment) => {
            const course = enrollment.Course;

            return (
              <div
                key={enrollment.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {course?.name}
                  </h2>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                    {course?.status}
                  </span>
                </div>

                <p className="text-sm leading-6 text-gray-500">
                  {course?.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-gray-600">
                  <p>
                    Location:{" "}
                    <span className="font-medium text-gray-900">
                      {course?.location || "Not specified"}
                    </span>
                  </p>

                  <p>
                    Enrolled:{" "}
                    <span className="font-medium text-gray-900">
                      {enrollment.enrolled_at}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(enrollment)}
                  className="mt-6 w-full rounded-lg border border-red-200 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Unenroll
                </button>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            {success ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  Done
                </div>

                <h2 className="text-xl font-semibold">
                  Unenrolled successfully
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  You have been removed from this course.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900">
                  Unenroll from course?
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  You are about to leave{" "}
                  <span className="font-medium text-gray-900">
                    {selectedEnrollment.Course?.name}
                  </span>
                  .
                </p>

                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={deleting}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleUnenroll}
                    disabled={deleting}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white"
                  >
                    {deleting ? "Unenrolling..." : "Unenroll"}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}