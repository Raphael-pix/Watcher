import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export function CircularSkeletonLoader(){
    return (
    <div className="skeleton-film-container">
        <div className="skeleton-image-container">
             <Skeleton circle width={100} height={100}/>
        </div>
        <div className="skeleton-film-details">
                <Skeleton style={{margin:'0 auto',marginTop:'2px'}} width={100}/>
        </div>
    </div>
)}

export default function SkeletonLoader(){
    return (
    <div className="skeleton-film-container">
        <div className="skeleton-image-container">
             <Skeleton width={175} height={260}/>
        </div>
        <div className="skeleton-film-details">
                <Skeleton count={2} style={{marginBottom:'5px'}} width={170}/>
        </div>
    </div>
)}