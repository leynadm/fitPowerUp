import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface PictureDBZFrameProps {
  pictureLink: string;
  pictureAlt:string
}

function PictureDBZFrame({ pictureLink,pictureAlt }: PictureDBZFrameProps) {
  return (
    <button
      style={{
        width: "72px",
        height: "72px",
        color: "#fff",
        background: "none",
        border: "none",
        borderRadius: "50%",
        position: "relative",
        zIndex: 0,
        transition: ".3s",
        cursor: "pointer",
        boxShadow: "0 0 0 1px #666",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar
          alt={pictureAlt}
          src={pictureLink}
          sx={{ width: 64, height: 64, alignSelf: "center" }}
        />
      </Stack>

      <span
        style={{
          position: "absolute",
          inset: "-1px",
          padding: "4px",
          borderRadius: "50%",
          background:
            "conic-gradient(#520975, #FFA500 30deg 120deg, #FFA500 150deg 180deg, #520975 210deg 300deg, #520975 330deg)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "intersect",
          transition: ".5s, 99999s 99999s transform",
          transform: "rotate(36000deg)",
          zIndex: -1,
        }}
      ></span>
    </button>
  );
}

export default PictureDBZFrame;
