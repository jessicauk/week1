import React, { useMemo, useState } from 'react';

export interface Column<T = Record<string, unknown>> {
  key: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: '', direction: null });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === null) {
      return data;
    }

    return [...data].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key);
      if (!column) return 0;

      let aValue: unknown;
      let bValue: unknown;

      if (typeof column.accessor === 'function') {
        // Can't sort function-based accessors easily, skip
        return 0;
      } else {
        aValue = a[column.accessor];
        bValue = b[column.accessor];
      }

      if (aValue === bValue) return 0;
      
      const result = (aValue as string | number) < (bValue as string | number) ? -1 : 1;
      return sortConfig.direction === 'asc' ? result : -result;
    });
  }, [data, columns, sortConfig]);

  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!sortable) return;

    setSortConfig(current => {
      if (current.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }
      
      if (current.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }
      
      return { key: '', direction: null };
    });
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    const value = row[column.accessor];
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return String(value);
  };

  const getSortIcon = (columnKey: string, sortable?: boolean) => {
    if (!sortable) return null;
    
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200" role="table">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                }`}
                style={{ width: column.width }}
                onClick={() => handleSort(column.key, column.sortable)}
                role="columnheader"
                tabIndex={column.sortable ? 0 : -1}
                onKeyDown={(e) => {
                  if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleSort(column.key, column.sortable);
                  }
                }}
                aria-sort={
                  sortConfig.key === column.key
                    ? sortConfig.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : column.sortable
                    ? 'none'
                    : undefined
                }
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {getSortIcon(column.key, column.sortable)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    style={{ width: column.width }}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};