import Link from "next/link";
import css from "./Sidebar.module.css";

const tags = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
];

export default function SidebarPage() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.list}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link className={css.link} href={`/notes/filter/${tag.toLowerCase()}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
