import React, { useRef } from 'react';
import {
  ExternalLink,
  Github
} from 'lucide-react';
import Shredder from './Shredder';
import './FoundationsArchive.css';

const COLUMNS_DATA = [
  {
    id: 'col-vision',
    title: '01 // Vision & Generative AI',
    items: [
      {
        id: 'dcgan',
        title: 'DCGAN Architecture',
        badge: 'Generative AI',
        description: 'Synthetic image generation with adversarial loss balancing.',
        path: '/DCGAN',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/DCGAN'
      },
      {
        id: 'plant-disease',
        title: 'Plant Pathology Classifier',
        badge: 'AgriTech Vision',
        description: 'Crop leaf disease vision pipeline preventing harvest loss.',
        path: '/PlantDisease',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/PlantDisease'
      },
      {
        id: 'face-mask',
        title: 'Face Mask Compliance Detector',
        badge: 'Edge Vision',
        description: 'Real-time public health vision model from video streams.',
        path: '/Face_mask_detection',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/Face_mask_detection'
      }
    ]
  },
  {
    id: 'col-benchmarks',
    title: '02 // Benchmarks & Medical AI',
    items: [
      {
        id: 'cifar-10',
        title: 'CIFAR-10 Deep CNN',
        badge: 'CNN Benchmark',
        description: '10-class CNN comparing depth, batchnorm & dropout.',
        path: '/CIFAR-10',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/CIFAR-10'
      },
      {
        id: 'breast-cancer',
        title: 'Breast Cancer Neural Diagnosis',
        badge: 'Medical AI',
        description: 'Clinical neural diagnosis classifying malignant vs. benign.',
        path: '/Breast_Cancer',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/Breast_Cancer'
      },
      {
        id: 'cats-vs-dogs',
        title: 'Cats vs Dogs Classifier',
        badge: 'Transfer Learning',
        description: 'Binary convolutional classifier utilizing transfer learning.',
        path: '/DogVSCats',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/DogVSCats'
      }
    ]
  },
  {
    id: 'col-foundations',
    title: '03 // Math & Core CV Lab',
    items: [
      {
        id: 'image-processing',
        title: 'Digital Image Processing Lab',
        badge: 'Core CV',
        description: 'Spatial filtering, 2D convolution kernels & edge operators.',
        path: '/IMAGE_PROCESSING',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/IMAGE_PROCESSING'
      },
      {
        id: 'mnist',
        title: 'MNIST Digit Recognizer',
        badge: 'Foundations',
        description: 'Ground-up feedforward neural net with cross-entropy loss.',
        path: '/MNIST',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/MNIST'
      },
      {
        id: 'research-papers',
        title: 'Research Paper Replications',
        badge: 'Deep Literature',
        description: 'Architectural dissections of landmark DL publications.',
        path: '/Research%20papers',
        url: 'https://github.com/Grimroze/Deep-Learning/tree/main/Research%20papers'
      }
    ]
  }
];

export default function FoundationsArchive() {
  const shredderRefs = [useRef(null), useRef(null), useRef(null)];

  const renderProjectCard = (item, colIdx) => (
    <div className="shred-docket-card">
      <div className="shred-docket-top">
        <span className="shred-docket-badge">
          {item.badge}
        </span>
        <button
          type="button"
          className="shred-red-dot"
          title="Click to shred"
          onPointerDown={e => e.stopPropagation()}
          onClick={() => shredderRefs[colIdx].current?.shred(item.id)}
          aria-label="Shred docket"
        />
      </div>

      <h4 className="shred-docket-title">{item.title}</h4>
      <p className="shred-docket-desc">{item.description}</p>

      <div className="shred-docket-footer">
        <div className="shred-docket-path-wrap">
          <Github size={11} className="shred-docket-gh-icon" />
          <span className="shred-docket-path">{item.path}</span>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shred-docket-link"
          onPointerDown={e => e.stopPropagation()}
        >
          <span>View Code</span>
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );

  return (
    <section id="foundations" className="foundations-section">
      <div className="foundations-container">
        {/* Minimal Sleek Header */}
        <div className="foundations-header-block">
          <div className="foundations-header-main">
            <span className="foundations-tag">03.1 // EXPERIMENTS & NEURAL FOUNDATIONS</span>
            <div className="foundations-title-row">
              <h3 className="foundations-title">Learned From Ground Up</h3>
              <span className="foundations-pill">9 Projects</span>
            </div>
            <p className="foundations-subtitle">
              Foundational neural network architectures & computer vision experiments built from scratch.
            </p>
          </div>

          <div className="foundations-header-actions">
            <a
              href="https://github.com/Grimroze/Deep-Learning"
              target="_blank"
              rel="noopener noreferrer"
              className="foundations-repo-btn"
            >
              <Github size={13} />
              <span>Grimroze/Deep-Learning</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Minimal Physics Hint */}
        <div className="foundations-hint-banner">
          <span className="hint-mac-dot" />
          <span>Click red dot or drag card down to shred • Auto-reconstructs</span>
        </div>

        {/* 3-Column Shredder Grid */}
        <div className="foundations-grid">
          {COLUMNS_DATA.map((col, idx) => (
            <div key={col.id} className="foundations-bay">
              <div className="foundations-bay-header">
                <h4 className="foundations-bay-title">{col.title}</h4>
              </div>

              <Shredder
                ref={shredderRefs[idx]}
                items={col.items}
                renderItem={item => renderProjectCard(item, idx)}
                width={600}
                height={550}
                fallHeight={140}
                slitHeight={5}
                slitColor="#242636"
                color="#f0f0f5"
                loopAfterDelete={true}
                autoAnimate={true}
                autoAnimateStartDelay={4500 + idx * 3000}
                autoAnimateInterval={9500}
                feedSpeed={220}
                bite={18}
                curl={0.08}
                stripWidth={9}
                gap={10}
                inset={8}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
