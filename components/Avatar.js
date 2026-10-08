export default function Avatar({ user, size = 40 }) {
  const style = { width: size, height: size };
  if (user?.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt={user.name || "user"} style={style} className="rounded-lg object-cover" referrerPolicy="no-referrer" />;
  }
  return (
    <span style={style} className="grid place-items-center rounded-lg bg-brand text-white font-bold">
      {(user?.name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}
