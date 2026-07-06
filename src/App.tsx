import { useState, useEffect } from "react";
import {
  BookOpen,
  Mail,
  GraduationCap,
  Briefcase,
  FlaskConical,
} from "lucide-react";

function useScrollAnimation() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.01, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    const initiallyVisible = new Set<string>();
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && el.id) {
        initiallyVisible.add(el.id);
      }
      observer.observe(el);
    });
    if (initiallyVisible.size > 0) {
      setVisibleElements(initiallyVisible);
    }

    return () => observer.disconnect();
  }, []);

  return visibleElements;
}

// ─── Icons ───

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  );
}

// ─── Data ───

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  startYear: number;
  startMonth: number;
  endYear?: number;
  endMonth?: number;
  type: "education" | "work" | "research";
  current?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "graduate-researcher",
    title: "Graduate Student Researcher — University of Michigan",
    description:
      "Researching advanced reasoning methods and agentic skills in large language models under Dr. Tu Vu, focusing on automated skill discovery and multi-agent inference-time algorithms.",
    startYear: 2025,
    startMonth: 1,
    type: "research",
    current: true,
  },
  {
    id: "ms-cs",
    title: "MS in Computer Science — University of Michigan",
    description:
      "Conducting research on LLM reasoning and agent skill evolution. Graduate coursework in Machine Learning, Artificial Intelligence, and Advanced Algorithms.",
    startYear: 2024,
    startMonth: 7,
    endYear: 2026,
    endMonth: 4,
    type: "education",
    current: true,
  },
];

interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  link?: string;
  githubRepo?: string;
}

const projects: Project[] = [
  {
    id: "evoskill",
    title: "EvoSkill",
    description:
      "A self-evolving framework that automatically discovers and refines agent skills through iterative failure analysis, achieving gains of up to +15.7% on SealQA and +11.4% on OfficeQA.",
    date: "2026",
    category: "Research",
    githubRepo: "Kuzoto/EvoSkill",
  },
];

// ─── Sections ───

function HeroSection({
  visibleElements,
}: {
  visibleElements: Set<string>;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 sm:py-6">
      <div className="max-w-3xl w-full">
        <div
          id="hero-content"
          data-animate
          className={`transition-all duration-300 ${
            visibleElements.has("hero-content")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-12 justify-center">
            <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-full border-2 border-accent shadow-lg bg-jet flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">CC</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl md:text-2xl font-bold mb-1 text-white">
                Christian Calvo
              </h1>
              <p className="text-dim-gray text-sm md:text-base mb-1.5">
                MS Student in Computer Science
              </p>
              <p className="text-dim-gray text-xs md:text-sm mb-3">
                University of Michigan, Ann Arbor
              </p>

              <div className="flex gap-3 items-center justify-center sm:justify-start flex-wrap">
                <a
                  href="https://github.com/Kuzoto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim-gray hover:text-accent transition-colors inline-flex"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/calvo-christian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim-gray hover:text-accent transition-colors inline-flex"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://scholar.google.com/citations?user=YOUR_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim-gray hover:text-accent transition-colors inline-flex"
                  aria-label="Google Scholar"
                >
                  <GoogleScholarIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:calvo@umich.edu"
                  className="text-dim-gray hover:text-accent transition-colors inline-flex"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchSection({
  visibleElements,
}: {
  visibleElements: Set<string>;
}) {
  return (
    <div className="py-2 sm:py-3">
      <div className="max-w-4xl mx-auto px-4">
        <div
          id="research-title"
          data-animate
          className={`mb-3 sm:mb-4 transition-all duration-300 ${
            visibleElements.has("research-title")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">
            Current Research
          </h2>
          <p className="text-sm text-dim-gray leading-relaxed">
            I am researching advanced reasoning methods and agentic skills in
            LLMs under{" "}
            <a
              href="https://tuvllms.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-accent-light transition-colors"
            >
              Dr. Tu Vu
            </a>{" "}
            at the University of Michigan.
          </p>
        </div>

        <div
          id="research-papers"
          data-animate
          className={`transition-all duration-300 ${
            visibleElements.has("research-papers")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-lg font-bold text-white mb-3">Publications</h3>
          <div className="space-y-3">
            <a
              href="https://openreview.net/forum?id=i4b4As7RFX"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-jet/50 border border-dim-gray/20 rounded-lg hover:border-accent transition-all group"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white group-hover:text-accent transition-colors mb-1">
                    EvoSkill: Automated Skill Discovery for Agents
                  </h4>
                  <p className="text-xs text-dim-gray/80 mb-2">
                    Salaheddin Alzubi, Noah Provenzano,{" "}
                    <span className="text-accent">Christian Calvo</span>, Jaydon
                    Bingham, Weiyuan Chen, Himanshu Tyagi, Dastin Huang, Tu Vu
                  </p>
                  <p className="text-sm text-dim-gray leading-relaxed">
                    A self-evolving framework that automatically discovers and
                    refines agent skills through iterative failure analysis.
                    EvoSkill analyzes execution failures, proposes new skills or
                    edits to existing ones, and materializes them into
                    structured, reusable skill folders. Achieves gains of up to
                    +15.7% on SealQA and +11.4% on OfficeQA.
                  </p>
                  <p className="text-xs text-accent mt-2">
                    AgentSkills 2026, San Jose, CA
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineSection({
  visibleElements,
}: {
  visibleElements: Set<string>;
}) {
  const sortedEvents = [...timelineEvents].sort((a, b) => {
    const aTime = a.startYear * 12 + a.startMonth;
    const bTime = b.startYear * 12 + b.startMonth;
    return bTime - aTime;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-5 h-5 text-accent" />;
      case "work":
        return <Briefcase className="w-5 h-5 text-accent" />;
      case "research":
        return <FlaskConical className="w-5 h-5 text-accent" />;
      default:
        return <GraduationCap className="w-5 h-5 text-accent" />;
    }
  };

  const formatDateRange = (event: TimelineEvent) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const startMonth = monthNames[event.startMonth];
    const endDisplay =
      event.endYear && event.endMonth !== undefined
        ? `${monthNames[event.endMonth]} ${event.endYear}`
        : "Present";
    return `${startMonth} ${event.startYear} - ${endDisplay}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div
        id="vertical-timeline"
        data-animate
        className={`transition-all duration-300 ${
          visibleElements.has("vertical-timeline")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
          Timeline
        </h3>

        <div className="relative">
          <div className="space-y-4">
            {sortedEvents.map((event, index) => (
              <div
                key={event.id}
                id={`timeline-event-${event.id}`}
                data-animate
                className={`relative pl-11 transition-all duration-300 ${
                  visibleElements.has(`timeline-event-${event.id}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div className="absolute left-1 top-1.5 bg-night rounded-full p-1.5">
                  {getEventIcon(event.type)}
                </div>

                {index < sortedEvents.length - 1 && (
                  <div className="absolute left-5 top-11 w-0.5 h-[calc(100%+1rem)] bg-dim-gray/30"></div>
                )}

                <div className="bg-jet/50 rounded-lg p-3 border border-dim-gray/20 hover:border-accent transition-colors">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h4 className="font-bold text-white text-sm">
                      {event.title}
                    </h4>
                    <span className="text-xs text-dim-gray whitespace-nowrap flex-shrink-0">
                      {formatDateRange(event)}
                    </span>
                  </div>
                  <p className="text-dim-gray text-xs leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({
  visibleElements,
}: {
  visibleElements: Set<string>;
}) {
  return (
    <div className="py-3 sm:py-4 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div
          id="projects-title"
          data-animate
          className={`mb-4 transition-all duration-300 ${
            visibleElements.has("projects-title")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Projects
          </h2>
        </div>

        <div className="space-y-3 mb-4">
          {projects.map((item, index) => (
            <div
              key={item.id}
              id={`project-item-${item.id}`}
              data-animate
              className={`transition-all duration-300 ${
                visibleElements.has(`project-item-${item.id}`)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <a
                href={
                  item.githubRepo
                    ? `https://github.com/${item.githubRepo}`
                    : item.link || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 bg-jet/50 rounded-lg p-3 border border-dim-gray/20 hover:border-accent transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-dim-gray/80 mt-0.5">
                        {item.category}
                      </p>
                    </div>
                    <span className="text-xs text-dim-gray whitespace-nowrap flex-shrink-0">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-dim-gray text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-jet/30 py-8 sm:py-12" id="footer">
      <div className="text-center max-w-4xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Let's Connect
          </h3>
          <p className="text-dim-gray mb-4 sm:mb-6 text-sm sm:text-base">
            Always interested in new opportunities and collaborations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <a
            href="mailto:calvo@umich.edu"
            className="text-white hover:text-accent transition-colors font-medium flex items-center gap-2 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            calvo@umich.edu
          </a>
        </div>

        <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
          <a
            href="https://github.com/Kuzoto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim-gray hover:text-accent transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/calvo-christian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim-gray hover:text-accent transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-dim-gray">
          &copy; {new Date().getFullYear()} Christian Calvo
        </p>
      </div>
    </div>
  );
}

// ─── App ───

export default function App() {
  const visibleElements = useScrollAnimation();

  return (
    <div className="min-h-screen bg-night text-white">
      <div className="relative px-4 pt-4 sm:pt-6 pb-0">
        <HeroSection visibleElements={visibleElements} />
      </div>

      <ResearchSection visibleElements={visibleElements} />

      <div className="relative py-3 sm:py-4">
        <TimelineSection visibleElements={visibleElements} />
      </div>

      <ProjectsSection visibleElements={visibleElements} />

      <Footer />
    </div>
  );
}
