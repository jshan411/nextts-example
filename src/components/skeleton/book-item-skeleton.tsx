import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import bookItemStyles from "@/components/bookItem.module.css";

export default function BookItemSkeleton() {
  return (
    <div className={bookItemStyles.container}>
      <Skeleton height={105} width={80} />
      <div style={{ flex: 1 }}>
        <Skeleton height={20} style={{ marginBottom: "8px" }} />
        <Skeleton height={16} width="80%" style={{ marginBottom: "16px" }} />
        <Skeleton height={14} width="60%" />
      </div>
    </div>
  );
}
