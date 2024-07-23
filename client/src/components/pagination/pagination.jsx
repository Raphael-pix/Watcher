import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './pagination.css'

export default function Pagination({currentPage,totalPages,onPageChange}){
        const getPageNumbers = () => {
            const pageNumbers = [];
            const delta = 2; // Number of pages to show before/after the current page

            const startPage = Math.max(1, currentPage - delta);
            const endPage = Math.min(totalPages, currentPage + delta);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            return pageNumbers;
        };

        const pageNumbers = getPageNumbers()
        
        return <nav className="pagination-container">
            <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(1)}><FaAngleDoubleLeft size={16}/></button>
            </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage === 1 ? 1 : currentPage - 1)}><FaAngleLeft size={16}/></button>
                </li>
                {pageNumbers.map((number, index) => (
                    <li key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage === totalPages ? totalPages :currentPage + 1)}><FaAngleRight size={16}/></button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(totalPages)}><FaAngleDoubleRight size={16}/></button>
                </li>
            </ul>
        </nav>

}