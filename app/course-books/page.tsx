"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CourseBooks() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to engineering course books for backward compatibility
    router.replace("/course-books/engineering");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-lg text-gray-600">Redirecting to Engineering Course Books...</div>
    </div>
  );
}
