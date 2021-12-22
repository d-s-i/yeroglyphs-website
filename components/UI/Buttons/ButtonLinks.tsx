import React from "react";
import { useRouter } from 'next/router';
import MySVGButton from "./MySVGButton";

function ButtonLinks() {

    const router = useRouter();
    
    return(
        <React.Fragment>
            <MySVGButton onClick={() => router.push("/mint")}>Mint</MySVGButton>
            {/* <MySVGButton onClick={() => router.push("/marketplace")}>Marketplace</MySVGButton> */}
            <MySVGButton onClick={() => router.push("/view")}>View</MySVGButton>
            <MySVGButton onClick={() => router.push('/generate')}>Generate</MySVGButton>
            <MySVGButton onClick={() => router.push("/save")}>Save</MySVGButton>
        </React.Fragment>
    );
}

export default ButtonLinks;