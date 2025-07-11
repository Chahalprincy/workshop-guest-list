export default function GuestList({ guests, onSelect }) {
  return (
    <div>
      <h2>Guest List</h2>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id} onClick={() => onSelect(guest.id)} style={{ cursor: "pointer" }}>
            <strong>{guest.name}</strong> — {guest.email}
          </li>
        ))}
      </ul>
    </div>
  );
}