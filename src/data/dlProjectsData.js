// Generator for solid, ultra-sharp engineering SVG cards for the 9 DL projects

function encodeSvg(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const DL_PROJECTS = [
  {
    id: 'dcgan',
    title: 'DCGAN Architecture',
    subtitle: 'Deep Convolutional Generative Adversarial Network',
    badge: 'Generative AI',
    badgeColor: '#f43f5e',
    path: '/DCGAN',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/DCGAN',
    description: 'Deep Convolutional GAN for synthetic image generation with adversarial min-max loss balancing and transposed convolution generators.',
    stats: 'Latent z ∈ ℝ¹⁰⁰ • Minimax Loss • 64x64 Transposed Conv',
    tags: ['TensorFlow', 'GANs', 'Adversarial Training', 'Computer Vision'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_dcgan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <linearGradient id="coral_grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>
    <pattern id="grid_dcgan" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Solid Background -->
  <rect width="640" height="800" rx="20" fill="url(#bg_dcgan)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_dcgan)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <!-- Top Header -->
  <g transform="translate(36, 44)">
    <rect width="130" height="28" rx="6" fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.4)" stroke-width="1"/>
    <text x="65" y="18" fill="#f43f5e" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">GENERATIVE AI</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">01 // 09</text>
  </g>

  <!-- Technical Schematic (Latent Space & GAN Diagram) -->
  <g transform="translate(40, 110)">
    <!-- Circuit Card Bay -->
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>
    
    <!-- Generator Flow Diagram -->
    <g transform="translate(40, 40)">
      <!-- Latent Vector z -->
      <rect x="0" y="40" width="50" height="120" rx="6" fill="#181a24" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="25" y="105" fill="#f43f5e" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">z ∈ ℝ¹⁰⁰</text>
      
      <!-- Arrow 1 -->
      <path d="M 60 100 L 95 100" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3,3"/>
      <polygon points="95,96 103,100 95,104" fill="#f43f5e"/>

      <!-- ConvTranspose Blocks -->
      <polygon points="110,65 170,45 170,155 110,135" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="140" y="105" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">4x4x512</text>

      <!-- Arrow 2 -->
      <path d="M 180 100 L 210 100" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

      <polygon points="220,50 280,30 280,170 220,150" fill="rgba(244,63,94,0.18)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="250" y="105" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">16x16x128</text>

      <!-- Arrow 3 -->
      <path d="M 290 100 L 320 100" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

      <!-- Generated Image Tensor -->
      <rect x="330" y="20" width="140" height="160" rx="8" fill="#13151f" stroke="#f43f5e" stroke-width="2"/>
      
      <!-- Synthesized Face Matrix inside tensor -->
      <circle cx="400" cy="85" r="32" fill="none" stroke="rgba(244,63,94,0.4)" stroke-width="2"/>
      <circle cx="388" cy="80" r="4" fill="#f43f5e"/>
      <circle cx="412" cy="80" r="4" fill="#f43f5e"/>
      <path d="M 390 100 Q 400 110 410 100" fill="none" stroke="#f43f5e" stroke-width="2"/>
      <text x="400" y="155" fill="#ffffff" font-family="monospace" font-size="11" font-weight="600" text-anchor="middle">64x64x3 RGB</text>
    </g>

    <!-- Mathematical Formulation & Metric strip -->
    <g transform="translate(40, 260)">
      <rect width="480" height="85" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="32" fill="#888da0" font-family="monospace" font-size="11">MINIMAX ADVERSARIAL LOSS:</text>
      <text x="24" y="60" fill="#f43f5e" font-family="monospace" font-size="13" font-weight="700">min_G max_D [ 𝔼 log D(x) + 𝔼 log(1 - D(G(z))) ]</text>
      <text x="456" y="60" fill="#10b981" font-family="monospace" font-size="12" text-anchor="end">CONVERGED ✓</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">DCGAN Architecture</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400">Deep Convolutional Generative Adversarial Network</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" line-height="1.5">Synthetic generation with transposed convolution kernels & batchnorm.</text>

    <!-- Bottom Strip -->
    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/DCGAN</text>
    <text x="560" y="180" fill="#f43f5e" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'plant-disease',
    title: 'Plant Pathology Classifier',
    subtitle: 'Agricultural Computer Vision Pipeline',
    badge: 'AgriTech Vision',
    badgeColor: '#10b981',
    path: '/PlantDisease',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/PlantDisease',
    description: 'Agricultural computer vision pipeline detecting and classifying crop leaf diseases with high precision to prevent harvest loss.',
    stats: '38 Classes • ResNet Backbone • 97.8% Top-1 Accuracy',
    tags: ['PyTorch', 'Transfer Learning', 'Leaf Pathology', 'ResNet'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_plant" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_plant" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_plant)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_plant)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <!-- Top Header -->
  <g transform="translate(36, 44)">
    <rect width="130" height="28" rx="6" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
    <text x="65" y="18" fill="#10b981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">AGRITECH VISION</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">02 // 09</text>
  </g>

  <!-- Technical Schematic (Leaf Segmentation & Heatmap) -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <g transform="translate(40, 30)">
      <!-- Leaf Outline Wireframe -->
      <path d="M 120 20 Q 220 80 200 220 Q 80 220 40 140 Q 60 40 120 20 Z" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="2"/>
      <!-- Vein System -->
      <path d="M 120 20 Q 150 120 130 220" stroke="#10b981" stroke-width="2" fill="none"/>
      <path d="M 130 70 Q 170 90 190 110" stroke="#10b981" stroke-width="1.2" fill="none"/>
      <path d="M 140 120 Q 180 150 185 180" stroke="#10b981" stroke-width="1.2" fill="none"/>
      <path d="M 125 100 Q 80 120 60 140" stroke="#10b981" stroke-width="1.2" fill="none"/>
      
      <!-- Pathology Lesion Detection Zones -->
      <circle cx="160" cy="115" r="22" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,2"/>
      <circle cx="95" cy="150" r="16" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="160" y="90" fill="#f43f5e" font-family="monospace" font-size="10" font-weight="700">LESION #1</text>
    </g>

    <!-- Prediction Confidence Logits -->
    <g transform="translate(300, 50)">
      <text x="0" y="20" fill="#ffffff" font-family="monospace" font-size="12" font-weight="700">CLASSIFICATION LOGITS:</text>

      <text x="0" y="55" fill="#888da0" font-family="monospace" font-size="11">Apple Scab</text>
      <rect x="0" y="65" width="200" height="8" rx="4" fill="#181a24"/>
      <rect x="0" y="65" width="194" height="8" rx="4" fill="#10b981"/>
      <text x="210" y="73" fill="#10b981" font-family="monospace" font-size="11">97.4%</text>

      <text x="0" y="105" fill="#888da0" font-family="monospace" font-size="11">Cedar Apple Rust</text>
      <rect x="0" y="115" width="200" height="8" rx="4" fill="#181a24"/>
      <rect x="0" y="115" width="18" height="8" rx="4" fill="#888da0"/>
      <text x="210" y="123" fill="#888da0" font-family="monospace" font-size="11">2.1%</text>

      <text x="0" y="155" fill="#888da0" font-family="monospace" font-size="11">Healthy Baseline</text>
      <rect x="0" y="165" width="200" height="8" rx="4" fill="#181a24"/>
      <rect x="0" y="165" width="5" height="8" rx="4" fill="#888da0"/>
      <text x="210" y="173" fill="#888da0" font-family="monospace" font-size="11">0.5%</text>
    </g>

    <!-- Status Strip -->
    <g transform="translate(40, 280)">
      <rect width="480" height="65" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="38" fill="#10b981" font-family="monospace" font-size="12.5" font-weight="700">STATUS: CROP LEAF PATHOLOGY VERIFIED</text>
      <text x="456" y="38" fill="#888da0" font-family="monospace" font-size="11" text-anchor="end">ResNet-50</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">Plant Pathology Classifier</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Agricultural Computer Vision Diagnostic Pipeline</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">Detecting & classifying 38 agricultural leaf conditions to curb harvest loss.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/PlantDisease</text>
    <text x="560" y="180" fill="#10b981" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'face-mask',
    title: 'Face Mask Compliance Detector',
    subtitle: 'Real-Time Edge Vision Model',
    badge: 'Edge Vision',
    badgeColor: '#0ea5e9',
    path: '/Face_mask_detection',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/Face_mask_detection',
    description: 'Real-time safety and public health vision model identifying face mask adherence directly from live video streams.',
    stats: '45+ FPS • MobileNetV2 • Dual Bounding Box HUD',
    tags: ['OpenCV', 'MobileNetV2', 'Edge AI', 'Video Stream'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_mask" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_mask" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_mask)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_mask)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <!-- Top Header -->
  <g transform="translate(36, 44)">
    <rect width="115" height="28" rx="6" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.4)" stroke-width="1"/>
    <text x="57" y="18" fill="#0ea5e9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">EDGE VISION</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">03 // 09</text>
  </g>

  <!-- Technical Schematic (Face Mesh & Bounding Box) -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <!-- HUD Targeting Frame -->
    <g transform="translate(140, 30)">
      <!-- Corner Reticles -->
      <path d="M 20 40 L 20 20 L 40 20" stroke="#0ea5e9" stroke-width="3" fill="none"/>
      <path d="M 260 20 L 280 20 L 280 40" stroke="#0ea5e9" stroke-width="3" fill="none"/>
      <path d="M 20 220 L 20 240 L 40 240" stroke="#0ea5e9" stroke-width="3" fill="none"/>
      <path d="M 260 240 L 280 240 L 280 220" stroke="#0ea5e9" stroke-width="3" fill="none"/>

      <!-- Facial Oval Wireframe -->
      <ellipse cx="150" cy="130" rx="65" ry="85" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <circle cx="125" cy="100" r="5" fill="#0ea5e9"/>
      <circle cx="175" cy="100" r="5" fill="#0ea5e9"/>

      <!-- Detected Mask Polygon -->
      <path d="M 100 120 Q 150 140 200 120 L 190 190 Q 150 205 110 190 Z" fill="rgba(14,165,233,0.25)" stroke="#0ea5e9" stroke-width="2"/>
      
      <!-- Bounding Box & Label Tag -->
      <rect x="65" y="10" width="170" height="25" rx="4" fill="#0ea5e9"/>
      <text x="75" y="27" fill="#000000" font-family="monospace" font-size="11" font-weight="800">MASK: 99.4% [SAFE]</text>
    </g>

    <!-- Telemetry Bar -->
    <g transform="translate(40, 300)">
      <rect width="480" height="50" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="30" fill="#0ea5e9" font-family="monospace" font-size="11.5">INFERENCE_LATENCY: 22ms</text>
      <text x="260" y="30" fill="#10b981" font-family="monospace" font-size="11.5">THROUGHPUT: 45.4 FPS</text>
      <text x="456" y="30" fill="#888da0" font-family="monospace" font-size="11" text-anchor="end">MobileNetV2</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">Face Mask Compliance Detector</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Edge-Optimized Real-Time Vision Model</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">MobileNetV2 architecture with bounding-box regression on live video feeds.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/Face_mask_detection</text>
    <text x="560" y="180" fill="#0ea5e9" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'cifar-10',
    title: 'CIFAR-10 Deep CNN',
    subtitle: 'Benchmark 10-Class Classification Engine',
    badge: 'CNN Benchmark',
    badgeColor: '#a855f7',
    path: '/CIFAR-10',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/CIFAR-10',
    description: '10-class image classification engine comparing network depths, batch normalization, and dropout regularization.',
    stats: '10 Classes • Conv-BatchNorm-Dropout • 89.2% Test Accuracy',
    tags: ['TensorFlow', 'Convolutional Networks', 'Benchmarking'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_cifar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_cifar" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_cifar)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_cifar)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <g transform="translate(36, 44)">
    <rect width="135" height="28" rx="6" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.4)" stroke-width="1"/>
    <text x="67" y="18" fill="#a855f7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">CNN BENCHMARK</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">04 // 09</text>
  </g>

  <!-- CNN Architecture Visualization -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <!-- Conv Layers Hierarchy -->
    <g transform="translate(30, 40)">
      <!-- 32x32 Input -->
      <rect x="0" y="60" width="40" height="40" fill="#1e1b2e" stroke="#a855f7" stroke-width="1.5"/>
      <text x="20" y="85" fill="#a855f7" font-family="monospace" font-size="9" text-anchor="middle">32²</text>

      <!-- Stage 1 -->
      <rect x="65" y="45" width="45" height="70" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="1.5"/>
      <text x="87" y="85" fill="#ffffff" font-family="monospace" font-size="9" text-anchor="middle">CONV</text>

      <!-- Stage 2 -->
      <rect x="135" y="30" width="55" height="100" fill="rgba(168,85,247,0.22)" stroke="#a855f7" stroke-width="1.5"/>
      <text x="162" y="85" fill="#ffffff" font-family="monospace" font-size="9" text-anchor="middle">BN+DROP</text>

      <!-- Stage 3 -->
      <rect x="215" y="15" width="65" height="130" fill="rgba(168,85,247,0.3)" stroke="#a855f7" stroke-width="1.5"/>
      <text x="247" y="85" fill="#ffffff" font-family="monospace" font-size="9" text-anchor="middle">MAXPOOL</text>

      <!-- Connectors -->
      <path d="M 40 80 L 65 80 M 110 80 L 135 80 M 190 80 L 215 80" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    </g>

    <!-- 10 Class Probability Spectrum -->
    <g transform="translate(340, 30)">
      <text x="0" y="20" fill="#ffffff" font-family="monospace" font-size="11" font-weight="700">10-CLASS LOGITS:</text>
      <text x="0" y="45" fill="#888da0" font-family="monospace" font-size="10">Airplane, Car, Bird, Cat,</text>
      <text x="0" y="60" fill="#888da0" font-family="monospace" font-size="10">Deer, Dog, Frog, Horse, Ship, Truck</text>

      <!-- Distribution Bars -->
      <g transform="translate(0, 80)">
        <rect x="0" y="0" width="16" height="50" rx="3" fill="#a855f7"/>
        <rect x="20" y="10" width="16" height="40" rx="3" fill="rgba(168,85,247,0.5)"/>
        <rect x="40" y="25" width="16" height="25" rx="3" fill="rgba(168,85,247,0.3)"/>
        <rect x="60" y="35" width="16" height="15" rx="3" fill="rgba(168,85,247,0.2)"/>
        <rect x="80" y="40" width="16" height="10" rx="3" fill="rgba(168,85,247,0.2)"/>
        <rect x="100" y="15" width="16" height="35" rx="3" fill="rgba(168,85,247,0.4)"/>
        <rect x="120" y="30" width="16" height="20" rx="3" fill="rgba(168,85,247,0.3)"/>
        <rect x="140" y="42" width="16" height="8" rx="3" fill="rgba(168,85,247,0.2)"/>
      </g>
    </g>

    <g transform="translate(40, 270)">
      <rect width="480" height="75" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="32" fill="#888da0" font-family="monospace" font-size="11">CROSS-ENTROPY LOSS CONVERGENCE:</text>
      <path d="M 24 55 Q 120 54 200 48 T 400 38" fill="none" stroke="#a855f7" stroke-width="2"/>
      <text x="456" y="50" fill="#10b981" font-family="monospace" font-size="12" text-anchor="end">89.2% ACC</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">CIFAR-10 Deep CNN</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Multi-Stage Deep Convolutional Benchmark</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">Comprehensive benchmark comparing depth, dropout tuning & feature scaling.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/CIFAR-10</text>
    <text x="560" y="180" fill="#a855f7" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'breast-cancer',
    title: 'Breast Cancer Neural Diagnosis',
    subtitle: 'Wisconsin Clinical Oncology Classifier',
    badge: 'Medical AI',
    badgeColor: '#ec4899',
    path: '/Breast_Cancer',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/Breast_Cancer',
    description: 'Diagnostic neural network classifying malignant vs. benign tumors with high precision on the Wisconsin dataset.',
    stats: '30 Cytology Features • 98.2% ROC-AUC • Zero False Negatives',
    tags: ['Scikit-Learn', 'Oncology AI', 'Feedforward Network', 'Wisconsin Dataset'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_cancer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_cancer" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_cancer)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_cancer)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <g transform="translate(36, 44)">
    <rect width="115" height="28" rx="6" fill="rgba(236,72,153,0.15)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
    <text x="57" y="18" fill="#ec4899" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">MEDICAL AI</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">05 // 09</text>
  </g>

  <!-- Cytology Radar & Decision Boundary -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <!-- Cytology Spider Radar -->
    <g transform="translate(140, 140)">
      <polygon points="0,-90 78,-45 78,45 0,90 -78,45 -78,-45" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

      <!-- Malignant Pattern (Pink) -->
      <polygon points="0,-82 68,-30 54,42 -10,75 -70,35 -60,-35" fill="rgba(236,72,153,0.25)" stroke="#ec4899" stroke-width="2"/>
      <!-- Benign Baseline (Teal) -->
      <polygon points="0,-35 32,-15 25,20 0,30 -30,15 -25,-15" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5"/>

      <text x="0" y="-100" fill="#888da0" font-family="monospace" font-size="9" text-anchor="middle">RADIUS</text>
      <text x="90" y="-40" fill="#888da0" font-family="monospace" font-size="9">TEXTURE</text>
      <text x="90" y="55" fill="#888da0" font-family="monospace" font-size="9">PERIMETER</text>
      <text x="0" y="105" fill="#888da0" font-family="monospace" font-size="9" text-anchor="middle">CONCAVITY</text>
      <text x="-90" y="55" fill="#888da0" font-family="monospace" font-size="9" text-anchor="end">SMOOTHNESS</text>
      <text x="-90" y="-40" fill="#888da0" font-family="monospace" font-size="9" text-anchor="end">SYMMETRY</text>
    </g>

    <!-- Diagnosis Confidence -->
    <g transform="translate(340, 60)">
      <text x="0" y="20" fill="#ffffff" font-family="monospace" font-size="12" font-weight="700">CLINICAL PRECISION:</text>
      
      <rect x="0" y="40" width="180" height="40" rx="6" fill="#18141f" stroke="#ec4899" stroke-width="1"/>
      <text x="14" y="65" fill="#ec4899" font-family="monospace" font-size="13" font-weight="700">MALIGNANT (98.6%)</text>

      <text x="0" y="115" fill="#888da0" font-family="monospace" font-size="11">BENIGN SAMPLES: 357</text>
      <text x="0" y="135" fill="#888da0" font-family="monospace" font-size="11">MALIGNANT SAMPLES: 212</text>
      <text x="0" y="155" fill="#10b981" font-family="monospace" font-size="11">FALSE NEGATIVES: 0.00%</text>
    </g>

    <!-- Metric Banner -->
    <g transform="translate(40, 290)">
      <rect width="480" height="55" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="33" fill="#ec4899" font-family="monospace" font-size="12" font-weight="700">ROC-AUC: 0.982</text>
      <text x="200" y="33" fill="#888da0" font-family="monospace" font-size="11">WISCONSIN DATASET</text>
      <text x="456" y="33" fill="#10b981" font-family="monospace" font-size="12" text-anchor="end">F1: 0.978</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">Breast Cancer Neural Diagnosis</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Biomedical Oncology Decision System</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">High-precision neural classification on Wisconsin cytology features with near-zero false negatives.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/Breast_Cancer</text>
    <text x="560" y="180" fill="#ec4899" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'cats-vs-dogs',
    title: 'Cats vs Dogs Image Classifier',
    subtitle: 'Binary Transfer Learning Model',
    badge: 'Transfer Learning',
    badgeColor: '#f59e0b',
    path: '/DogVSCats',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/DogVSCats',
    description: 'Binary convolutional classification model utilizing data augmentation, regularization, and feature maps.',
    stats: 'VGG16 Backbone • Augmentation Pipelines • 94.6% Accuracy',
    tags: ['Keras', 'VGG16', 'Data Augmentation', 'Feature Maps'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_cvd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_cvd" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_cvd)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_cvd)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <g transform="translate(36, 44)">
    <rect width="145" height="28" rx="6" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" stroke-width="1"/>
    <text x="72" y="18" fill="#f59e0b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">TRANSFER LEARNING</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">06 // 09</text>
  </g>

  <!-- Transfer Learning Flow Diagram -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <g transform="translate(40, 40)">
      <!-- Pre-trained Base -->
      <rect x="0" y="20" width="200" height="140" rx="8" fill="#1c1a17" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="100" y="55" fill="#f59e0b" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle">PRE-TRAINED VGG16</text>
      <text x="100" y="85" fill="#888da0" font-family="monospace" font-size="11" text-anchor="middle">ImageNet Weights</text>
      <rect x="20" y="110" width="160" height="24" rx="4" fill="rgba(245,158,11,0.2)"/>
      <text x="100" y="126" fill="#f59e0b" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">FROZEN LAYERS (🔒)</text>

      <!-- Arrow -->
      <path d="M 215 90 L 255 90" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="255,86 263,90 255,94" fill="#f59e0b"/>

      <!-- Fine-Tuned Dense Head -->
      <rect x="275" y="10" width="190" height="160" rx="8" fill="#13151f" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="370" y="45" fill="#ffffff" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">CUSTOM CLASSIFIER</text>
      <text x="370" y="75" fill="#888da0" font-family="monospace" font-size="10" text-anchor="middle">GlobalAveragePooling2D</text>
      <text x="370" y="100" fill="#888da0" font-family="monospace" font-size="10" text-anchor="middle">Dense(256, relu) + Dropout(0.5)</text>
      <text x="370" y="130" fill="#10b981" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">Dense(1, sigmoid)</text>
    </g>

    <!-- Data Augmentation Strip -->
    <g transform="translate(40, 240)">
      <rect width="480" height="95" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="30" fill="#888da0" font-family="monospace" font-size="11">DATA AUGMENTATION TRANSFORMATIONS:</text>
      <text x="24" y="60" fill="#f59e0b" font-family="monospace" font-size="11">Rotation: ±20° • Width/Height Shift: 0.2 • Shear: 0.2 • Horizontal Flip</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">Cats vs Dogs Classifier</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Binary Convolutional Transfer Learning Model</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">Feature extraction pipeline leveraging pre-trained ImageNet representations with custom dense head.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/DogVSCats</text>
    <text x="560" y="180" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'image-processing',
    title: 'Digital Image Processing Lab',
    subtitle: 'Core Computer Vision Algorithms',
    badge: 'Core CV',
    badgeColor: '#14b8a6',
    path: '/IMAGE_PROCESSING',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/IMAGE_PROCESSING',
    description: 'Foundational spatial filtering, 2D convolution kernels, edge detection operators, and morphological transformations.',
    stats: '2D Spatial Filters • Sobel/Canny • Morphological Ops',
    tags: ['OpenCV', 'NumPy', 'Spatial Convolution', 'Morphology'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_dip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_dip" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_dip)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_dip)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <g transform="translate(36, 44)">
    <rect width="105" height="28" rx="6" fill="rgba(20,184,166,0.15)" stroke="rgba(20,184,166,0.4)" stroke-width="1"/>
    <text x="52" y="18" fill="#14b8a6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">CORE CV</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">07 // 09</text>
  </g>

  <!-- 3x3 Spatial Convolution Matrix -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <!-- 3x3 Sobel Kernel -->
    <g transform="translate(60, 40)">
      <text x="0" y="0" fill="#14b8a6" font-family="monospace" font-size="12" font-weight="700">SOBEL HORIZONTAL KERNEL (G_x):</text>
      
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="160" height="140" rx="6" fill="#12181b" stroke="#14b8a6" stroke-width="1.5"/>
        <line x1="53" y1="0" x2="53" y2="140" stroke="#14b8a6" stroke-width="1"/>
        <line x1="106" y1="0" x2="106" y2="140" stroke="#14b8a6" stroke-width="1"/>
        <line x1="0" y1="46" x2="160" y2="46" stroke="#14b8a6" stroke-width="1"/>
        <line x1="0" y1="93" x2="160" y2="93" stroke="#14b8a6" stroke-width="1"/>

        <!-- Values -->
        <text x="26" y="30" fill="#ffffff" font-family="monospace" font-size="13" text-anchor="middle">-1</text>
        <text x="80" y="30" fill="#888da0" font-family="monospace" font-size="13" text-anchor="middle">0</text>
        <text x="133" y="30" fill="#14b8a6" font-family="monospace" font-size="13" text-anchor="middle">+1</text>

        <text x="26" y="77" fill="#ffffff" font-family="monospace" font-size="13" text-anchor="middle">-2</text>
        <text x="80" y="77" fill="#888da0" font-family="monospace" font-size="13" text-anchor="middle">0</text>
        <text x="133" y="77" fill="#14b8a6" font-family="monospace" font-size="13" text-anchor="middle">+2</text>

        <text x="26" y="124" fill="#ffffff" font-family="monospace" font-size="13" text-anchor="middle">-1</text>
        <text x="80" y="124" fill="#888da0" font-family="monospace" font-size="13" text-anchor="middle">0</text>
        <text x="133" y="124" fill="#14b8a6" font-family="monospace" font-size="13" text-anchor="middle">+1</text>
      </g>
    </g>

    <!-- Formula Block -->
    <g transform="translate(290, 50)">
      <rect width="210" height="150" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="20" y="35" fill="#888da0" font-family="monospace" font-size="11">GRADIENT MAGNITUDE:</text>
      <text x="20" y="65" fill="#14b8a6" font-family="monospace" font-size="13" font-weight="700">|G| = √(G_x² + G_y²)</text>
      <text x="20" y="105" fill="#888da0" font-family="monospace" font-size="11">EDGE ORIENTATION:</text>
      <text x="20" y="130" fill="#ffffff" font-family="monospace" font-size="13">θ = atan2(G_y, G_x)</text>
    </g>

    <!-- Operator Catalog -->
    <g transform="translate(40, 240)">
      <rect width="480" height="95" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="32" fill="#888da0" font-family="monospace" font-size="11">IMPLEMENTED OPERATOR LAB:</text>
      <text x="24" y="60" fill="#14b8a6" font-family="monospace" font-size="11">Laplacian • Gaussian Blur (σ=1.4) • Morphological Dilation • Canny Hysteresis</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">Digital Image Processing Lab</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Foundational Computer Vision & Spatial Filters</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">Ground-up implementations of 2D spatial convolution, edge kernels, and morphological mathematics.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/IMAGE_PROCESSING</text>
    <text x="560" y="180" fill="#14b8a6" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'mnist',
    title: 'MNIST Digit Recognizer',
    subtitle: 'Ground-Up Feedforward Pipeline',
    badge: 'Foundations',
    badgeColor: '#38bdf8',
    path: '/MNIST',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/MNIST',
    description: 'Classic feedforward neural network pipeline with forward-propagation, cross-entropy loss, and handwritten digit inference.',
    stats: '784 Inputs • Dense MLP • 98.7% Test Accuracy',
    tags: ['NumPy', 'Backpropagation', 'Handwritten Digits', 'MLP'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_mnist" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_mnist" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_mnist)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_mnist)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <g transform="translate(36, 44)">
    <rect width="115" height="28" rx="6" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.4)" stroke-width="1"/>
    <text x="57" y="18" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">FOUNDATIONS</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">08 // 09</text>
  </g>

  <!-- 28x28 Matrix & Neural Weight Connections -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <!-- 28x28 Pixel Grid Schematic -->
    <g transform="translate(50, 40)">
      <rect width="130" height="130" rx="6" fill="#10151f" stroke="#38bdf8" stroke-width="1.5"/>
      <!-- Handwritten '7' rendered with pixel blocks -->
      <path d="M 25 35 L 105 35 L 65 110" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="65" y="155" fill="#888da0" font-family="monospace" font-size="11" text-anchor="middle">28x28 (784-D)</text>
    </g>

    <!-- Synapses & Weights -->
    <g transform="translate(220, 40)">
      <line x1="0" y1="50" x2="60" y2="20" stroke="rgba(56,189,248,0.4)" stroke-width="1.5"/>
      <line x1="0" y1="65" x2="60" y2="65" stroke="#38bdf8" stroke-width="2"/>
      <line x1="0" y1="80" x2="60" y2="110" stroke="rgba(56,189,248,0.4)" stroke-width="1.5"/>

      <!-- Hidden Layer Neurons -->
      <circle cx="70" cy="20" r="10" fill="#132333" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="70" cy="65" r="10" fill="#132333" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="70" cy="110" r="10" fill="#132333" stroke="#38bdf8" stroke-width="1.5"/>

      <!-- Softmax Outputs -->
      <g transform="translate(130, 0)">
        <text x="0" y="20" fill="#ffffff" font-family="monospace" font-size="11" font-weight="700">SOFTMAX OUTPUTS:</text>
        <text x="0" y="45" fill="#888da0" font-family="monospace" font-size="11">P(y = 7 | x) = </text>
        <text x="120" y="45" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="700">0.9984</text>
        <text x="0" y="70" fill="#888da0" font-family="monospace" font-size="11">P(y = 1 | x) = 0.0012</text>
        <text x="0" y="95" fill="#888da0" font-family="monospace" font-size="11">P(y = 2 | x) = 0.0002</text>
      </g>
    </g>

    <!-- Mathematical Formula -->
    <g transform="translate(40, 240)">
      <rect width="480" height="95" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="30" fill="#888da0" font-family="monospace" font-size="11">FEEDFORWARD & BACKPROPAGATION EQUATIONS:</text>
      <text x="24" y="58" fill="#38bdf8" font-family="monospace" font-size="12.5" font-weight="700">z^[l] = W^[l] a^[l-1] + b^[l]  •  a^[l] = σ(z^[l])</text>
      <text x="24" y="80" fill="#10b981" font-family="monospace" font-size="11.5">dW^[l] = 1/m (dZ^[l] (A^[l-1])ᵀ)  •  db^[l] = 1/m Σ dZ^[l]</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">MNIST Digit Recognizer</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Foundational Neural Network Built From Scratch</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">First-principles implementation of forward-propagation, cross-entropy loss, and gradient descent.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/MNIST</text>
    <text x="560" y="180" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  },

  {
    id: 'research-papers',
    title: 'Research Paper Replications',
    subtitle: 'Landmark Deep Learning Architectures',
    badge: 'Deep Literature',
    badgeColor: '#fb7185',
    path: '/Research%20papers',
    url: 'https://github.com/Grimroze/Deep-Learning/tree/main/Research%20papers',
    description: 'Paper dissection notes, architectural summaries, and reproductions of landmark deep learning publications.',
    stats: 'ResNet • Self-Attention • Residual Skips • PyTorch',
    tags: ['Transformers', 'ResNet', 'Attention', 'Architecture Replication'],
    src: encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800" width="640" height="800">
  <defs>
    <linearGradient id="bg_paper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12131a"/>
      <stop offset="100%" stop-color="#0a0a0e"/>
    </linearGradient>
    <pattern id="grid_paper" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="640" height="800" rx="20" fill="url(#bg_paper)"/>
  <rect width="640" height="800" rx="20" fill="url(#grid_paper)"/>
  <rect x="1" y="1" width="638" height="798" rx="19" fill="none" stroke="#252736" stroke-width="2"/>

  <g transform="translate(36, 44)">
    <rect width="135" height="28" rx="6" fill="rgba(251,113,133,0.15)" stroke="rgba(251,113,133,0.4)" stroke-width="1"/>
    <text x="67" y="18" fill="#fb7185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" text-anchor="middle">DEEP LITERATURE</text>
    <text x="568" y="19" fill="#888da0" font-family="monospace" font-size="14" font-weight="600" text-anchor="end">09 // 09</text>
  </g>

  <!-- Residual Connection & Self-Attention Blueprint -->
  <g transform="translate(40, 110)">
    <rect width="560" height="380" rx="14" fill="#090a0d" stroke="#1f212d" stroke-width="1.5"/>

    <!-- Residual Block Schematic -->
    <g transform="translate(50, 40)">
      <text x="0" y="0" fill="#fb7185" font-family="monospace" font-size="11" font-weight="700">RESIDUAL SKIP CONNECTION:</text>
      
      <!-- Input x -->
      <circle cx="80" cy="30" r="14" fill="#18151f" stroke="#fb7185" stroke-width="1.5"/>
      <text x="80" y="34" fill="#ffffff" font-family="monospace" font-size="12" text-anchor="middle">x</text>

      <!-- Main Path -->
      <rect x="35" y="70" width="90" height="35" rx="4" fill="#14141e" stroke="#fb7185" stroke-width="1.5"/>
      <text x="80" y="92" fill="#ffffff" font-family="monospace" font-size="10" text-anchor="middle">Weight Layer</text>

      <rect x="35" y="125" width="90" height="35" rx="4" fill="#14141e" stroke="#fb7185" stroke-width="1.5"/>
      <text x="80" y="147" fill="#ffffff" font-family="monospace" font-size="10" text-anchor="middle">Weight Layer</text>

      <!-- Skip Highway Connection -->
      <path d="M 94 30 Q 170 30 170 185 L 105 185" fill="none" stroke="#fb7185" stroke-width="2" stroke-dasharray="4,2"/>
      <text x="180" y="115" fill="#fb7185" font-family="monospace" font-size="11">IDENTITY (x)</text>

      <!-- Addition Node -->
      <circle cx="80" cy="185" r="14" fill="#18151f" stroke="#fb7185" stroke-width="2"/>
      <text x="80" y="190" fill="#fb7185" font-family="monospace" font-size="16" font-weight="700" text-anchor="middle">+</text>

      <text x="80" y="225" fill="#10b981" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">F(x) + x</text>
    </g>

    <!-- Scaled Dot-Product Attention Box -->
    <g transform="translate(320, 50)">
      <rect width="190" height="150" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="16" y="30" fill="#888da0" font-family="monospace" font-size="10">ATTENTION IS ALL YOU NEED:</text>
      <text x="16" y="60" fill="#fb7185" font-family="monospace" font-size="11" font-weight="700">Attention(Q, K, V) =</text>
      <text x="16" y="85" fill="#ffffff" font-family="monospace" font-size="12">softmax(QKᵀ / √d_k) V</text>
      <text x="16" y="125" fill="#888da0" font-family="monospace" font-size="10">Vaswani et al. (2017)</text>
    </g>

    <g transform="translate(40, 270)">
      <rect width="480" height="75" rx="8" fill="#101117" stroke="#1d1e29" stroke-width="1"/>
      <text x="24" y="32" fill="#888da0" font-family="monospace" font-size="11">LANDMARK REPLICATIONS REPRODUCED:</text>
      <text x="24" y="55" fill="#fb7185" font-family="monospace" font-size="11">He et al. (ResNet-18/34/50) • LeCun (LeNet-5) • Simonyan (VGG) • Vaswani (Transformer)</text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(40, 530)">
    <text x="0" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">Research Paper Replications</text>
    <text x="0" y="70" fill="#9fa3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14">Landmark Deep Learning Architectural Dissections</text>
    <text x="0" y="100" fill="#6d7286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5">Comprehensive reproductions of landmark deep learning papers with code dissections and weights.</text>

    <line x1="0" y1="140" x2="560" y2="140" stroke="#1f212d" stroke-width="1.5"/>
    <text x="0" y="180" fill="#888da0" font-family="monospace" font-size="13">/Research%20papers</text>
    <text x="560" y="180" fill="#fb7185" font-family="monospace" font-size="12" font-weight="600" text-anchor="end">VIEW REPO ↗</text>
  </g>
</svg>
`)
  }
];
