import React from 'react';
import LogoLoop from './LogoLoop';
import './LogoLoop.css';

const TECH_STACK_LOGOS = [
  {
    title: 'Python',
    src: '/tech/python.svg',
    href: 'https://www.python.org/'
  },
  {
    title: 'C++',
    src: '/tech/cpp.svg',
    href: 'https://isocpp.org/'
  },
  {
    title: 'PyTorch',
    src: '/tech/pytorch.svg',
    href: 'https://pytorch.org/'
  },
  {
    title: 'LangChain',
    src: '/tech/langchain.svg',
    href: 'https://www.langchain.com/'
  },
  {
    title: 'LangGraph',
    src: '/tech/langgraph.svg',
    href: 'https://www.langchain.com/langgraph'
  },
  {
    title: 'Hugging Face',
    src: '/tech/huggingface.svg',
    href: 'https://huggingface.co/'
  },
  {
    title: 'Ollama',
    src: '/tech/ollama.svg',
    href: 'https://ollama.com/'
  },
  {
    title: 'FastAPI',
    src: '/tech/fastapi.svg',
    href: 'https://fastapi.tiangolo.com/'
  },
  {
    title: 'Docker',
    src: '/tech/docker.svg',
    href: 'https://www.docker.com/'
  },
  {
    title: 'PostgreSQL',
    src: '/tech/postgresql.svg',
    href: 'https://www.postgresql.org/'
  },
  {
    title: 'Redis',
    src: '/tech/redis.svg',
    href: 'https://redis.io/'
  }
];

export default function ConnectLoop() {
  return (
    <div className="contact-loop-wrapper">
      <LogoLoop
        logos={TECH_STACK_LOGOS}
        speed={52}
        hoverSpeed={18}
        direction="left"
        logoHeight={62}
        gap={64}
        fadeOut={true}
        fadeOutWidth={0.16}
        scaleOnHover={true}
        draggable={true}
        scrollBoost={0.65}
        labels="below"
        ariaLabel="Verified Engineering Stack"
      />
    </div>
  );
}
