export default function ({ title, description }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: "50px 100px",
      }}
    >
      <img
        src="https://unavatar.io/github/emrocode"
        style={{
          width: "96px",
          height: "96px",
          borderRadius: 999,
        }}
      />
      <h1
        style={{
          marginTop: 64,
          color: "#333",
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.025em",
          whiteSpace: "pre-wrap",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 16,
          color: "#333",
          fontSize: 36,
          fontWeight: 400,
          lineHeight: 1.5,
          opacity: 0.8,
          whiteSpace: "pre-wrap",
        }}
      >
        {description}
      </p>
    </div>
  );
}
