import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center"
      type="submit"
    >
      <FaPaperPlane className="mr-2" />
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default SubmitButton;