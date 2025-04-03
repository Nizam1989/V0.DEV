export const Badge = ({ children, className = "" }: any) => (
  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${className}`}>
    {children}
  </span>
)
