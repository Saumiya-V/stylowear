import type { ErrorState, Props } from "@/types/type";
import React from "react";

export class ErrorBoundary extends React.Component<Props,ErrorState>{
    constructor(props:Props){
        super(props)
        this.state = {hasError:false}
    }

   static getDerivedStateFromError(){
        return {hasError:true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("Error caught by errorboundary",error,errorInfo)
    }

    render(){
        if(this.state.hasError){
            return <h2>Something Went Wrong</h2>
        }
        return this.props.children
    }
}