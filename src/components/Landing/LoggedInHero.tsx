import { createStyles, Title, Center } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #120643 70%), url(/images/landing-hero.webp)",
    paddingTop: theme.spacing.xl * 1,
    paddingBottom: theme.spacing.xl * 1.5,
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },
}));

export function LandingLoggedInHero() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Center>
        <Title className={classes.title}>Ganymede</Title>
      </Center>
    </div>
  );
}