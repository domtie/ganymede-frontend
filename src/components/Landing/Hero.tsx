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
          The Wubby Archive
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Watch all past PaymoneyWubby streams
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link href="https://www.twitch.tv/paymoneywubby">
            <Button className={classes.control} variant="white" size="lg">
              Watch Live on Twitch
            </Button>
          </Link>
          <Link href="https://pmw.store/">
            <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
              Get Wubby Merch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
