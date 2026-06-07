export function buildPdfHtml(contract, lang = 'en') {
  const isTE = lang === 'te';

  const labels = {
    title: isTE ? 'నిర్మాణ ఒప్పందం' : 'Construction Agreement',
    company: 'CHERUKURI CONSTRUCTIONS',
    companyTE: 'చెరుకూరి కన్‌స్ట్రక్షన్స్',
    phone: '+91 9848467428',
    date: isTE ? 'తేదీ' : 'Date',
    client: isTE ? 'క్లయింట్ పేరు' : 'Client Name',
    project: isTE ? 'ప్రాజెక్ట్ పేరు' : 'Project Name',
    clientPhone: isTE ? 'క్లయింట్ ఫోన్' : 'Client Phone',
    address: isTE ? 'చిరునామా' : 'Address',
    sno: isTE ? 'క్ర.సం' : 'S.No',
    material: isTE ? 'మెటీరియల్' : 'Material',
    specs: isTE ? 'వివరాలు' : 'Specifications',
    materials: isTE ? 'మెటీరియల్స్ & వివరాలు' : 'Materials & Specifications',
    total: isTE ? 'మొత్తం కాంట్రాక్ట్ మొత్తం' : 'Total Contract Amount',
    builder: isTE ? 'బిల్డర్' : 'Builder',
    owner: isTE ? 'యజమాని / క్లయింట్' : 'Owner / Client',
    builderSig: isTE ? 'బిల్డర్ సంతకం' : 'Builder Signature',
    ownerSig: isTE ? 'యజమాని సంతకం' : 'Owner Signature',
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹ 0';
    return '₹ ' + Number(amount).toLocaleString('en-IN');
  };

  const materialsRows = (contract.materials || [])
    .map(
      (m, i) => `
      <tr>
        <td style="border:1px solid #d1d5db;padding:10px 12px;text-align:center;font-size:13px;color:#374151;">${i + 1}</td>
        <td style="border:1px solid #d1d5db;padding:10px 12px;font-size:13px;color:#111827;">${m.material || ''}</td>
        <td style="border:1px solid #d1d5db;padding:10px 12px;font-size:13px;color:#111827;">${m.specifications || ''}</td>
      </tr>
    `
    )
    .join('');

  return `
<div id="pdf-root" style="width:210mm;padding:20mm 15mm 25mm 15mm;background:#fff;font-family:'Inter','Noto Sans Telugu',sans-serif;color:#111827;font-size:14px;line-height:1.6;box-sizing:border-box;">

  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
    <div style="width:80px;">
      <!-- Placeholders for logos -->
      <img src="/logo-left.png" alt="Logo Left" style="max-width:100%;max-height:80px;object-fit:contain;" onerror="this.style.display='none'" />
    </div>
    <div style="flex:1;text-align:center;">
      <h1 style="font-size:26px;font-weight:700;color:#1e3a5f;letter-spacing:1px;margin:0;">CHERUKURI CONSTRUCTIONS</h1>
      <div style="font-size:14px;color:#6b7280;font-style:italic;margin-top:4px;">Building Specifications & Construction Agreement</div>
    </div>
    <div style="width:80px;text-align:right;">
      <img src="/logo-right.png" alt="Logo Right" style="max-width:100%;max-height:80px;object-fit:contain;" onerror="this.style.display='none'" />
    </div>
  </div>

  <div style="text-align:right;margin-bottom:30px;font-size:14px;font-weight:500;color:#374151;">
    <div style="display:inline-block;text-align:left;">
      <div style="margin-bottom:8px;"><strong>Date:</strong> </div>
      <div><strong>Phone:</strong> +91 9848467428</div>
    </div>
  </div>

  <div style="display:flex;justify-content:space-between;margin-bottom:20px;gap:20px;">
    <div style="flex:1;">
      <div style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${labels.client}</div>
      <div style="font-size:14px;font-weight:500;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:4px;min-height:22px;">${contract.clientName || ''}</div>
    </div>
    <div style="flex:1;">
      <div style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${labels.clientPhone}</div>
      <div style="font-size:14px;font-weight:500;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:4px;min-height:22px;">${contract.clientPhone || ''}</div>
    </div>
  </div>


  <div style="font-size:14px;font-weight:600;color:#1e3a5f;margin:24px 0 10px 0;text-transform:uppercase;letter-spacing:0.5px;">${labels.materials}</div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <thead>
      <tr>
        <th style="background:#1e3a5f;color:#fff;font-size:12px;font-weight:600;padding:10px 12px;text-align:center;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #1e3a5f;width:60px;">${labels.sno}</th>
        <th style="background:#1e3a5f;color:#fff;font-size:12px;font-weight:600;padding:10px 12px;text-align:left;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #1e3a5f;">${labels.material}</th>
        <th style="background:#1e3a5f;color:#fff;font-size:12px;font-weight:600;padding:10px 12px;text-align:left;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #1e3a5f;">${labels.specs}</th>
      </tr>
    </thead>
    <tbody>
      ${materialsRows || '<tr><td colspan="3" style="border:1px solid #d1d5db;padding:12px;text-align:center;color:#9ca3af;">—</td></tr>'}
    </tbody>
  </table>

  <div style="display:flex;justify-content:flex-end;margin:20px 0 32px 0;">
    <div style="border:2px solid #1e3a5f;padding:12px 24px;border-radius:6px;text-align:right;">
      <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">${labels.total}</div>
      <div style="font-size:20px;font-weight:700;color:#1e3a5f;">${formatCurrency(contract.billAmount)}</div>
    </div>
  </div>

  <div style="display:flex;justify-content:space-between;margin-top:80px;">
    <div style="font-size:14px;font-weight:600;color:#374151;">
      ${labels.builderSig}: ________________________
    </div>
    <div style="font-size:14px;font-weight:600;color:#374151;">
      ${labels.ownerSig}: ________________________
    </div>
  </div>

</div>`;
}

export async function generatePdf(contract, lang = 'en') {
  const html2pdf = (await import('html2pdf.js')).default;
  const htmlContent = buildPdfHtml(contract, lang);

  const wrapper = document.createElement('div');
  // Position off-screen
  wrapper.style.cssText = 'position:fixed;top:-9999px;left:-9999px;z-index:-1;background:#fff;';
  wrapper.innerHTML = htmlContent;
  document.body.appendChild(wrapper);

  const element = wrapper.querySelector('#pdf-root');

  // Wait for fonts to load
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  await new Promise((r) => setTimeout(r, 100));

  // Fix for html2canvas + Tailwind v4 oklch crash:
  // Temporarily disable all non-font stylesheets in the document.
  // Because our PDF template uses 100% inline styles, it will render perfectly
  // without the global CSS, and html2canvas will never encounter an oklch color.
  const stylesheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .filter((s) => !s.href || !s.href.includes('fonts.googleapis.com'));
  
  stylesheets.forEach((s) => (s.disabled = true));
  
  // Ensure the body background is explicit to avoid transparent/oklch body parsing
  const originalBodyBg = document.body.style.backgroundColor;
  document.body.style.backgroundColor = '#ffffff';

  const opt = {
    margin: 0,
    filename: `${contract.clientName || 'Contract'}_Agreement.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');
    return pdfBlob;
  } finally {
    // Restore stylesheets and background immediately
    stylesheets.forEach((s) => (s.disabled = false));
    document.body.style.backgroundColor = originalBodyBg;
    document.body.removeChild(wrapper);
  }
}

export async function shareOrDownloadPdf(blob, filename = 'Agreement.pdf') {
  // Always download first
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Try to open share sheet
  const file = new File([blob], filename, { type: 'application/pdf' });
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: filename,
        text: 'Construction Agreement - Cherukuri Constructions',
      });
      return { shared: true, downloaded: true };
    } catch (err) {
      if (err.name === 'AbortError') return { shared: false, cancelled: true, downloaded: true };
    }
  }

  return { shared: false, downloaded: true };
}
