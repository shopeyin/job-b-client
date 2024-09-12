"use client";
import { saveJob, unSaveJob } from "@/lib/actions";
import { useActionState, useOptimistic } from "react";
import { toast } from "sonner";

function SaveJobButton({ id, isSaved }) {
  return (
    <>
      {isSaved ? (
        <button
          onClick={() => unSaveJob(id)}
          className="group relative flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Unsave
        </button>
      ) : (
        <button
          onClick={() => saveJob(id)}
          className="group relative flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Job
        </button>
      )}
    </>
  );
}

export default SaveJobButton;

// "use client";
// // import { saveJob } from "@/lib/actions";
// import { checkSavedJob, saveJob, unSaveJob } from "@/lib/api";
// import { useActionState, useState, useEffect } from "react";
// import { toast } from "sonner";

// function SaveJobButton({ id, token, userId }) {
//   const [isSaved, setIsSaved] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const checkIfSaved = async () => {
//       try {
//         const response = await checkSavedJob(id, token);
//         console.log(response);
//         setIsSaved(response.data); // assuming API returns { isSaved: true/false }
//       } catch (error) {
//         console.error("Error checking save status:", error);
//       }
//       setIsLoaded(true);
//     };

//     checkIfSaved();
//   }, [id]);

//   const toggleSave = async () => {
//     setLoading(true);
//     try {
//       if (isSaved) {
//         // Unsave the item
//         await unSaveJob(id, token);
//         setIsSaved(false);
//       } else {
//         // Save the item
//         let x = await saveJob(id, userId, token);
//         console.log(x, "SAVE JOB");
//         setIsSaved(true);
//       }
//     } catch (error) {
//       console.error("Error toggling save status:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(isSaved, "ISSAVED");
//   return (
//     <>
//       {loaded ? (
//         <button
//           onClick={toggleSave}
//           disabled={loading}
//           className={`px-4 py-2 rounded-md ${
//             isSaved ? "bg-red-500" : "bg-green-500"
//           } text-white`}
//         >
//           {loading ? "Loading..." : isSaved ? "Unsave" : "Save"}
//         </button>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

// export default SaveJobButton;
