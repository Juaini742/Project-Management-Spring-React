import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

interface Props {
    button: React.ReactElement;
    content: React.ReactElement;
    title?: string;
    description?: string;
}

export default function DialogContainer({button, content, title, description}: Props) {
  return (
      <Dialog>
          <DialogTrigger asChild>
              {button}
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>
                      {description}
                  </DialogDescription>
                  {content}
              </DialogHeader>
          </DialogContent>
      </Dialog>
  )
}