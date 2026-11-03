import React, { useState, useCallback } from 'react';
import TearTicket from './TearTicket';
import { ExternalLink, RotateCcw, Music, Sparkles, Disc } from 'lucide-react';
import './SonicVault.css';

const PLAYLISTS = [
  {
    id: 'latent-space',
    tag: '01 // NEURAL FREQUENCIES',
    title: 'Latent Space Drift',
    vibe: 'Speculative Decoding & 3 AM Multi-Agent Topology',
    genre: 'Cyber Downtempo • Minimal Tech',
    stats: '142 Tracks • Deep Focus',
    image: '/playlists/latent-drift.svg',
    imageAlt: 'Latent Space Drift Cover Art',
    rotate: -1.8,
    stubAdmit: 'ADMIT 01',
    stubAction: 'RIP TO STREAM',
    stubNumber: 'NO. 001429',
    accentColor: '#38bdf8',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM'
  },
  {
    id: 'knight-flow',
    tag: '02 // HIGH CADENCE RIGOR',
    title: 'LeetCode Knight // Flow',
    vibe: 'Sub-15ms Dynamic Programming & High-Octane Rush',
    genre: 'Phonk • Dark Synth • 160 BPM',
    stats: '98 Tracks • Speed Run',
    image: '/playlists/knight-flow.svg',
    imageAlt: 'LeetCode Knight Flow Cover Art',
    rotate: 0.6,
    stubAdmit: 'ADMIT 02',
    stubAction: 'TEAR FOR SPEED',
    stubNumber: 'NO. 008921',
    accentColor: '#fb7185',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX11gh2tH1b8e'
  },
  {
    id: 'urdu-coffee',
    tag: '03 // DTU ART & POETRY',
    title: 'Midnight Ghazal & Coffee',
    vibe: 'Echoes in the quiet hour & black espresso steam',
    genre: 'Acoustic Sufi • Urdu Lo-Fi • Soul',
    stats: '86 Tracks • 2 AM Nostalgia',
    image: '/playlists/urdu-coffee.svg',
    imageAlt: 'Midnight Ghazal and Coffee Cover Art',
    rotate: 2.2,
    stubAdmit: 'ADMIT 03',
    stubAction: 'RIP FOR SOUL',
    stubNumber: 'NO. 004183',
    accentColor: '#f59e0b',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUfTFmNBRM'
  }
];

export default function SonicVault({ theme = 'dark' }) {
  const [tornTickets, setTornTickets] = useState({});

  const handleTear = useCallback((id, url) => {
    setTornTickets(prev => ({ ...prev, [id]: true }));
    // Optional smooth delay before opening external link or keep user on ticket
  }, []);

  const handleReset = useCallback((e, id) => {
    e.stopPropagation();
    setTornTickets(prev => ({ ...prev, [id]: false }));
  }, []);

  return (
    <section id="easter-egg" className="sonic-vault-section">
      <div className="sonic-vault-container">
        {/* Sarcastic Header */}
        <div className="sonic-vault-header">
          <div className="sonic-vault-badge">
            <Sparkles size={13} />
            <span>05 // UNCLASSIFIED EASTER EGG</span>
          </div>
          <h3 className="sonic-vault-title">
            Wait... you scrolled all the way to the abyss?
          </h3>
          <p className="sonic-vault-subtitle">
            What, you want my playlists now? Fine. Pick a ticket, grab the perforated stub, and tear it open.
            Real frequencies only — no skips allowed.
          </p>
          <div className="sonic-vault-instruction">
            <span>✂️ Grab &amp; drag the stub on the right to tear it open</span>
          </div>
        </div>

        {/* 3 Staggered Physical Tear Tickets */}
        <div className="sonic-tickets-deck">
          {PLAYLISTS.map((playlist) => {
            const isTorn = !!tornTickets[playlist.id];

            return (
              <div key={playlist.id} className="sonic-ticket-item">
                <TearTicket
                  width={420}
                  height={220}
                  stubSize={130}
                  image={playlist.image}
                  imageAlt={playlist.imageAlt}
                  rotate={playlist.rotate}
                  torn={isTorn}
                  onTear={() => handleTear(playlist.id, playlist.spotifyUrl)}
                  background={theme === 'light' ? '#ffffff' : '#18181b'}
                  stubBackground={theme === 'light' ? '#f4f4f5' : '#1f1f24'}
                  borderColor={theme === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}
                  color={theme === 'light' ? '#09090b' : '#f5f5f5'}
                  stub={
                    <div className="ticket-stub-inner">
                      <span className="ticket-stub-admit">{playlist.stubAdmit}</span>

                      <div className="ticket-stub-rip-cue">
                        <span className="ticket-stub-scissors">✂️</span>
                        <span className="ticket-stub-action-text">{playlist.stubAction}</span>
                      </div>

                      {/* Barcode Graphic */}
                      <div className="ticket-stub-barcode">
                        <span className="ticket-stub-barcode-bar" style={{ width: '2px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '5px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '1px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '4px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '2px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '6px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '3px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '1px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '5px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '2px' }} />
                      </div>

                      <span className="ticket-stub-no">{playlist.stubNumber}</span>
                    </div>
                  }
                >
                  {/* Left Main Ticket Body */}
                  <div className="ticket-body-content">
                    {isTorn ? (
                      /* Unlocked state after tearing the stub */
                      <div className="ticket-unlocked-state">
                        <span className="unlocked-badge">
                          🎧 ACCESS GRANTED // TORN
                        </span>
                        <a
                          href={playlist.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="unlocked-play-btn"
                        >
                          <Music size={14} />
                          <span>Stream on Spotify</span>
                          <ExternalLink size={13} />
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleReset(e, playlist.id)}
                          className="ticket-reset-btn"
                          title="Re-stitch ticket"
                        >
                          <RotateCcw size={11} />
                          <span>Re-stitch stub</span>
                        </button>
                      </div>
                    ) : (
                      /* Normal Resting State */
                      <>
                        <div
                          className="ticket-top-tag"
                          style={{ color: playlist.accentColor }}
                        >
                          {playlist.tag}
                        </div>
                        <h4 className="ticket-playlist-title">{playlist.title}</h4>
                        <p className="ticket-playlist-vibe">{playlist.vibe}</p>

                        <div className="ticket-footer-row">
                          <span className="ticket-stats">{playlist.stats}</span>
                          <div className="ticket-eq-bars">
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TearTicket>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
