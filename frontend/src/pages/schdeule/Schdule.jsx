import React, { useEffect, useState } from "react";
import { getMySchedule } from "../../api/schdeules/Schdeules";
import Loading from "../../components/Loading";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const data = await getMySchedule();


        setSchedules(data.information );
      } catch (error) {
        console.error("Failed to get schedule:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

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
          Schedule
        </h1>

        <p className="mt-1 text-gray-500">
          Your scheduled classes.
        </p>
      </div>

      {schedules.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            No schedules found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Course #{schedule.courses_id}
              </h2>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  Day:{" "}
                  <span className="font-medium text-gray-900">
                    {schedule.day}
                  </span>
                </p>

                <p>
                  Start:{" "}
                  <span className="font-medium text-gray-900">
                    {schedule.start_time}
                  </span>
                </p>

                <p>
                  Finish:{" "}
                  <span className="font-medium text-gray-900">
                    {schedule.finish_time}
                  </span>
                </p>

                <p>
                  Classroom:{" "}
                  <span className="font-medium text-gray-900">
                    #{schedule.classroom_id}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}