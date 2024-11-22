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
    form: React.ReactElement;
    title: string;
    description: string;
}

export default function FormDialog({button, form, title, description}: Props) {
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
                  {form}
              </DialogHeader>
          </DialogContent>
      </Dialog>
  )
}