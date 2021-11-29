import React from "react";
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import MySVGButton from "./MySVGButton";

interface Props {
    isReadyForProd: boolean
}

function ButtonLinks(props: Props) {

    const router = useRouter();
    
    if(props.isReadyForProd) {
        return(
            <React.Fragment>
                <MySVGButton onClick={() => router.push("/mint")}>Mint</MySVGButton>
                <MySVGButton onClick={() => router.push("/view")}>View</MySVGButton>
                <MySVGButton onClick={() => router.push('/generate')}>Generate</MySVGButton>
                <MySVGButton onClick={() => router.push("/save")}>Save</MySVGButton>
            </React.Fragment>
        );
    } else {
        return(
            <React.Fragment>
                <MySVGButton onClick={() => {}}>Comming Soon ...</MySVGButton>
                <MySVGButton onClick={() => {}}>Comming Soon ...</MySVGButton>
                <MySVGButton onClick={() => {}}>Comming Soon ...</MySVGButton>
                <MySVGButton onClick={() => {}}>Comming Soon ...</MySVGButton>
            </React.Fragment>
        );
    }
}

export default ButtonLinks;