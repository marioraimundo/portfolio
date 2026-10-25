import { Fragment } from "react";

function Word({
  word,
  index,
  delay,
  step,
}: {
  word: string;
  index: number;
  delay: number;
  step: number;
}) {
  return (
    <span
      className="inline-block"
      data-reveal
      data-reveal-delay={delay + index * step}
    >
      {word}
    </span>
  );
}

export function RevealText({
  text,
  delay = 0,
  step = 45,
}: {
  text: string;
  delay?: number;
  step?: number;
}) {
  const lines = text.split("\n");

  if (lines.length === 1) {
    const words = lines[0].split(/\s+/).filter(Boolean);

    return (
      <>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <Word word={word} index={index} delay={delay} step={step} />
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </>
    );
  }

  let offset = 0;

  return (
    <>
      {lines.map((line, lineIndex) => {
        const words = line.split(/\s+/).filter(Boolean);
        const lineOffset = offset;
        offset += words.length;

        return (
          <span key={lineIndex} className="block">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <Word
                  word={word}
                  index={lineOffset + index}
                  delay={delay}
                  step={step}
                />
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        );
      })}
    </>
  );
}
