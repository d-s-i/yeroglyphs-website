import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: React.ReactNode;
}

function ModalContainer(props: Props) {
   const [isMounted, setIsMounted] = useState<Boolean>(false)

   useEffect(() => {
      setIsMounted(true);

      return(() => setIsMounted(false));
   }, [])

   return isMounted
      ? createPortal(props.children, 
        document.getElementById("modal-root")! as HTMLDivElement)
      : null
}

export default ModalContainer;