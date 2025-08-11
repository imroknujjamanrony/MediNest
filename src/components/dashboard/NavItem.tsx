import Link from "next/link";

export default function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {label}
    </Link>
  );
}
