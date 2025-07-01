import { usePaginationStore } from "@/store/paginationStore";
import React from "react";

const Pagination = () => {
  const { setCurrentPage, totalPages, currentPage } = usePaginationStore();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="join mt-4 w-full flex justify-center items-center">
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        «
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`join-item btn ${currentPage === p ? "btn-active" : ""}`}
        >
          {p}
        </button>
      ))}

      <button
        className="join-item btn"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
