import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './Hero.module.css';
import Link from 'next/link';

export function LandingHero() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          PaymoneyWubby
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Enjoy the entire Wubby archive.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link href="/channels">
            <Button className={classes.control} variant="white" size="lg">
              Channels
            </Button>
          </Link>
          <Link href="/login">
            <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
