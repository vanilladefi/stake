import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { keyframes, styled } from "../../stitches.config";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: "$backgroundA",
  zIndex: "10001",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: "$backgroundSecondary",
  borderRadius: 0,
  boxShadow: "0px 0px 0px 1px $colors$extraMuted",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  zIndex: "10002",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }: any) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
}

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  fontWeight: 300,
  fontSize: "$md",
  fontFamily: "$heading",
  textTransform: "uppercase",
  letterSpacing: "1px",
  borderBottom: "1px solid $extraMuted",
  boxSizing: "border-box",
  p: "$5",
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  wordBreak: 'break-word',
  marginBottom: 20,
  px: "$5",
  py: "$2",
  paddingBottom: "$1",
  fontSize: "$md",
  fontFamily: "$body",
  lineHeight: 1.5,
});

const StyledCancel = styled(AlertDialogPrimitive.Cancel, {
  background: "transparent",
  border: 0,
  margin: 0,
  fontSize: "$md",
  borderTop: "1px solid $extraMuted",
  boxSizing: "border-box",
  display: "flex",
  position: "relative",
  width: "100%",
  outline: 0,
  p: "$5",
});

// Exports
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogTitle = StyledTitle;
export const AlertDialogDescription = StyledDescription;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = StyledCancel;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
