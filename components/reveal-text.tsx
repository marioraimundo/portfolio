import { Fragment } from "react";

function Word({
  word,
  index,
  delay,
  step,
  shake,
}: {
  word: string;
  index: number;
  delay: number;
  step: number;
  shake?: boolean;
}) {
  if (!shake) {
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

  const match = word.match(/^([\s\S]*?)([.,!?…:;]*)$/u);
  const core = match?.[1] || word;
  const punctuation = match?.[2] ?? "";

  return (
    <span
      className="inline-block"
      data-reveal
      data-reveal-delay={delay + index * step}
    >
      <span className="word-shake">{core}</span>
      {punctuation}
    </span>
  );
}

export function RevealText({
  text,
  delay = 0,
  step = 45,
  animateLastWord = false,
}: {
  text: string;
  delay?: number;
  step?: number;
  animateLastWord?: boolean;
}) {
  const lines = text.split("\n");

  const lastWordIndex = text
    .split(/\s+/)
    .filter(Boolean).length - 1;

  if (lines.length === 1) {
    const words = lines[0].split(/\s+/).filter(Boolean);

    return (
      <>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <Word
              word={word}
              index={index}
              delay={delay}
              step={step}
              shake={animateLastWord && index === lastWordIndex}
            />
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
                  shake={
                    animateLastWord && lineOffset + index === lastWordIndex
                  }
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
