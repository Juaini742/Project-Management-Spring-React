import {Button} from "@/components/ui/button.tsx";

interface Props {
    isLoading: boolean;
    label: string;
}
export default function ButtonWithLoading({isLoading, label}: Props) {
    return (
        <Button
            disabled={isLoading}
            className={`w-full ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
        >
            {
                isLoading ? (
                    <>
                  <span className="animate-spin mr-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a8 8 0 1 1 0 15.292"
                      />
                    </svg>
                  </span>
                        Loading...
                    </>
                ) : (
                    label
                )}
        </Button>
    )
}