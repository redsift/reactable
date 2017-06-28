import React from 'react';

function pageHref(num) {
    return `#page-${num + 1}`
}

export class Paginator extends React.Component {
    handlePrevious(e) {
        e.preventDefault()
        this.props.onPageChange(this.props.currentPage - 1)
    }

    handleNext(e) {
        e.preventDefault()
        this.props.onPageChange(this.props.currentPage + 1);
    }

    handleFirst(e) {
        e.preventDefault()
        this.props.onPageChange(0)
    }

    handleLast(e) {
        e.preventDefault()
        this.props.onPageChange(this.props.numPages - 1);
    }

    handlePageButton(page, e) {
        e.preventDefault();
        this.props.onPageChange(page);
    }

    renderPrevious() {
        const disabled = this.props.currentPage === 0;
        const modClass = disabled ? ' reactable-disabled-page' : '';

        return <a className= { 'reactable-previous-page'  + modClass }
                  href={pageHref(this.props.currentPage - 1)}
                  onClick={ !disabled && this.handlePrevious.bind(this)}>
                    {this.props.previousPageLabel || 'Previous'}
               </a>
    }

    renderNext() {
        const disabled = this.props.currentPage === (this.props.numPages - 1);
        const modClass = disabled ? ' reactable-disabled-page' : '';

        return <a className= { 'reactable-next-page'  + modClass }
                  href={pageHref(this.props.currentPage + 1)}
                  onClick={ !disabled && this.handleNext.bind(this)}>
                    {this.props.nextPageLabel || 'Next'}
               </a>
    }

    renderFirst() {
        const disabled = this.props.currentPage === 0;
        const modClass = disabled ? ' reactable-disabled-page' : '';

        return <a className= { 'reactable-first-page'  + modClass }
                  href={pageHref(0)}
                  onClick={ !disabled && this.handleFirst.bind(this)}>
                    {this.props.firstPageLabel || 'First'}
               </a>
    }

    renderLast() {
        const disabled = this.props.currentPage === (this.props.numPages - 1);
        const modClass = disabled ? ' reactable-disabled-page' : '';

        return <a className= { 'reactable-last-page' + modClass }
                  href={pageHref(this.props.numPages - 1)}
                  onClick={ !disabled && this.handleLast.bind(this)}>
                    {this.props.lastPageLabel || 'Last'}
               </a>
    }

    renderPageButton(className, pageNum) {

        return <a className={className}
                  key={pageNum}
                  href={pageHref(pageNum)}
                  onClick={this.handlePageButton.bind(this, pageNum)}>
                  {pageNum + 1}
              </a>
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Paginator');
        }

        if (typeof this.props.numPages === 'undefined') {
            throw new TypeError('Must pass a non-zero numPages argument to Paginator');
        }

        if (typeof this.props.currentPage === 'undefined') {
            throw new TypeError('Must pass a currentPage argument to Paginator');
        }

        let pageButtons = [];
        let pageButtonLimit = this.props.pageButtonLimit;
        let currentPage = this.props.currentPage;
        let numPages = this.props.numPages;
        let lowerHalf = Math.round( pageButtonLimit / 2 );
        let upperHalf = (pageButtonLimit - lowerHalf);

        for (let i = 0; i < this.props.numPages; i++) {
            let showPageButton = false;
            let pageNum = i;
            let className = "reactable-page-button";
            if (currentPage === i) {
                className += " reactable-current-page";
            }
            pageButtons.push( this.renderPageButton(className, pageNum));
        }

        if(currentPage - pageButtonLimit + lowerHalf > 0) {
            if(currentPage > numPages - lowerHalf) {
                pageButtons.splice(0, numPages - pageButtonLimit)
            } else {
                pageButtons.splice(0, currentPage - pageButtonLimit + lowerHalf);
            }
        }

        if((numPages - currentPage) > upperHalf) {
            pageButtons.splice(pageButtonLimit, pageButtons.length - pageButtonLimit);
        }

        return (
            <tbody className="reactable-pagination">
                <tr>
                    <td colSpan={this.props.colSpan}>
                        <div>
                            {this.renderFirst()}
                            {this.renderPrevious()}
                            {pageButtons}
                            {this.renderNext()}
                            {this.renderLast()}
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }
};
