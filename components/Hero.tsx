
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onStart: () => void;
}

interface DeclaredFile {
  id: string;
  name: string;
  examLink: string;
  answerLink: string;
  guideLink: string;
  category: string;
  password?: string;
}

const CATEGORIES = ["Tài liệu LTĐH", "Đề thi thử TN THPT 2026", "Bài giải chi tiết", "Tài liệu hóa học"];

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [showFolders, setShowFolders] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  
  const [portView, setPortView] = useState<'selection' | 'port-choice' | 'student-view' | 'teacher-login' | 'teacher-dashboard'>('selection');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState(false);
  
  const [counts, setCounts] = useState({
    kho: 1245,
    luyenDe: 3562,
    huongDan: 890
  });

  // Hệ thống lưu trữ dữ liệu qua LocalStorage
  const [declaredFiles, setDeclaredFiles] = useState<DeclaredFile[]>(() => {
    const saved = localStorage.getItem('vanhai_declared_files_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [formName, setFormName] = useState('');
  const [formExamLink, setFormExamLink] = useState('');
  const [formAnswerLink, setFormAnswerLink] = useState('');
  const [formGuideLink, setFormGuideLink] = useState('');
  const [syncCode, setSyncCode] = useState('');

  useEffect(() => {
    localStorage.setItem('vanhai_declared_files_v3', JSON.stringify(declaredFiles));
  }, [declaredFiles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        kho: prev.kho + Math.floor(Math.random() * 5) - 2,
        luyenDe: prev.luyenDe + Math.floor(Math.random() * 7) - 3,
        huongDan: prev.huongDan + Math.floor(Math.random() * 3) - 1
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogin = () => {
    if (adminPass === 'admin68') {
      setPortView('teacher-dashboard');
      setAdminError(false);
      setAdminPass('');
    } else {
      setAdminError(true);
    }
  };

  const handleAddFile = () => {
    if (!formName) return;
    const newFile: DeclaredFile = {
      id: Date.now().toString(),
      name: formName,
      examLink: formExamLink,
      answerLink: formAnswerLink,
      guideLink: formGuideLink,
      category: selectedCategory
    };
    setDeclaredFiles(prev => [...prev, newFile]);
    setFormName(''); setFormExamLink(''); setFormAnswerLink(''); setFormGuideLink('');
    alert('Khai báo tài liệu thành công!');
  };

  const handleDeleteFile = (id: string) => {
    setDeclaredFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleLuyenDeClick = () => {
    window.open("https://script.google.com/macros/s/AKfycbwpXBigG-9gdK3Jj23pP4o5_8GMnP-Ak3THOKF1XJr1I7-80hrGuhvqsQUVDevJ_ynw/exec", "_blank");
  };

  const selectMainCategory = (cat: string) => {
    setSelectedCategory(cat);
    setPortView('port-choice');
  };

  const goBackToSelection = () => {
    setPortView('selection');
    setSelectedCategory('');
  };

  const goBackToPortChoice = () => {
    setPortView('port-choice');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 text-center">
      <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 md:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] drop-shadow-2xl uppercase tracking-tighter">
        VANHAI EDUCATION
      </h2>
      <p className="text-lg md:text-3xl text-teal-200 font-bold mb-8 md:mb-10 tracking-tight">
        🚀 Đồng hành tri thức – Định hướng tương lai 🚀
      </p>
      <div className="max-w-7xl mx-auto text-slate-300 text-sm md:text-xl font-medium mb-12 px-2">
        <p className="md:whitespace-nowrap">Giúp học sinh THPT học đúng trọng tâm – phát triển tư duy – tự tin chinh phục kỳ thi.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-16 md:mb-24">
        <button onClick={() => setShowWelcomeModal(true)} className="w-full sm:w-auto px-6 md:px-12 py-4 md:py-5 bg-gradient-to-r from-[#005a5a] to-[#004d4d] border-2 border-[#D4AF37]/60 hover:from-[#006666] hover:to-[#005a5a] text-[#D4AF37] font-black text-sm md:text-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] transform hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-tighter px-4">CHÀO MỪNG ĐẾN VỚI VANHAI EDUCATION</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
        <div onClick={() => { setShowFolders(true); setPortView('selection'); }} className="cursor-pointer h-full">
          <FeatureCard icon="📚" title="KHO TÀI LIỆU PHONG PHÚ" desc="Cập nhật mới nhất theo cấu trúc Bộ Giáo dục & Đào tạo." visitors={counts.kho} />
        </div>
        <div onClick={handleLuyenDeClick} className="cursor-pointer h-full">
          <FeatureCard icon="🌏" title="ĐỀ THI THỬ TN THPT MÔN HÓA HỌC- 2026" subtitle="Đề thi thử TN PTTH trên toàn quốc" desc="Làm bài trực tuyến tại hệ thống khảo thí quốc gia của VANHAI." visitors={counts.luyenDe} />
        </div>
        <div onClick={() => setShowGuideModal(true)} className="cursor-pointer h-full">
          <FeatureCard icon="🤖" title="CẨM NANG SỬ DỤNG" desc="Cẩm nang hướng dẫn sử dụng Kho tài liệu và Luyện đề thông minh 24/7." visitors={counts.huongDan} />
        </div>
      </div>

      {showFolders && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-[#002d2d]/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto py-10">
          <div className="max-w-5xl w-full bg-[#004d4d] border border-[#D4AF37]/30 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative max-h-[90vh] flex flex-col">
            <button onClick={() => { setShowFolders(false); setPortView('selection'); }} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-teal-900/50 text-[#D4AF37] hover:rotate-90 transition-all font-black">✕</button>

            {portView === 'selection' && (
              <div className="w-full text-center overflow-y-auto pt-4 flex flex-col">
                <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] mb-2 uppercase tracking-[0.1em]">KHO TÀI LIỆU PHONG PHÚ</h3>
                <div className="w-16 h-1 bg-teal-500 mx-auto mb-10"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => selectMainCategory(cat)}
                      className="p-10 bg-[#003d3d] border-2 border-[#006666] rounded-[2rem] hover:border-[#D4AF37] hover:bg-[#004d4d] transition-all group shadow-xl flex flex-col items-center gap-4 transform hover:-translate-y-1"
                    >
                      <span className="text-6xl group-hover:scale-110 transition-transform">📂</span>
                      <span className="text-white font-black text-xl uppercase tracking-tight">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {portView === 'port-choice' && (
              <div className="w-full text-center overflow-y-auto pt-4 flex flex-col items-center justify-center flex-1">
                <button onClick={goBackToSelection} className="absolute top-10 left-10 text-teal-400 hover:text-[#D4AF37] text-sm font-black uppercase flex items-center gap-2">← QUAY LẠI</button>
                <h3 className="text-2xl md:text-3xl font-black text-[#D4AF37] mb-2 uppercase tracking-tight">{selectedCategory}</h3>
                <p className="text-teal-400 text-xs font-black uppercase tracking-widest mb-12 opacity-60">CHỌN CỔNG TRUY CẬP</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl px-4">
                  <button onClick={() => setPortView('student-view')} className="group p-12 bg-teal-900/40 border-2 border-teal-500/20 rounded-3xl hover:border-teal-400 hover:bg-teal-800 transition-all flex flex-col items-center gap-6 shadow-2xl">
                    <span className="text-6xl group-hover:bounce transition-all">👨‍🎓</span>
                    <span className="text-xl font-black text-white uppercase">CỔNG HỌC SINH</span>
                  </button>
                  <button onClick={() => setPortView('teacher-login')} className="group p-12 bg-[#BF953F]/10 border-2 border-[#BF953F]/20 rounded-3xl hover:border-[#D4AF37] hover:bg-[#BF953F]/20 transition-all flex flex-col items-center gap-6 shadow-2xl">
                    <span className="text-6xl group-hover:bounce transition-all">👨‍🏫</span>
                    <span className="text-xl font-black text-[#D4AF37] uppercase">CỔNG GIÁO VIÊN</span>
                  </button>
                </div>
              </div>
            )}

            {portView === 'teacher-login' && (
              <div className="max-w-md mx-auto w-full py-12 animate-in slide-in-from-bottom-4 text-center">
                <button onClick={goBackToPortChoice} className="text-teal-400 hover:text-[#D4AF37] text-sm font-black uppercase flex items-center gap-2 mb-8">← Quay lại</button>
                <h4 className="text-2xl font-black text-white mb-8 uppercase tracking-widest">Xác thực quyền hạn</h4>
                <div className="space-y-6">
                  <input 
                    type="password" 
                    placeholder="Nhập mật khẩu Giáo viên" 
                    className="w-full p-5 bg-[#003d3d] border-2 border-[#006666] rounded-2xl text-white outline-none focus:border-[#D4AF37] transition-all text-center font-mono text-xl tracking-widest" 
                    value={adminPass} 
                    onChange={(e) => setAdminPass(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} 
                  />
                  {adminError && <p className="text-red-400 text-xs font-bold">Mật khẩu không chính xác!</p>}
                  <button onClick={handleAdminLogin} className="w-full py-5 bg-[#D4AF37] text-[#003d3d] font-black rounded-2xl hover:bg-[#FCF6BA] transition-all shadow-xl uppercase tracking-widest">Xác nhận</button>
                </div>
              </div>
            )}

            {portView === 'teacher-dashboard' && (
              <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in">
                <div className="flex items-center justify-between mb-6 border-b border-[#D4AF37]/20 pb-4">
                  <button onClick={goBackToPortChoice} className="text-teal-400 hover:text-[#D4AF37] text-sm font-black uppercase flex items-center gap-2">← Thoát Quản Trị</button>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-[#D4AF37] uppercase tracking-tighter">QUẢN TRỊ VIÊN</h3>
                    <p className="text-teal-500 text-[10px] font-black uppercase tracking-widest">{selectedCategory}</p>
                  </div>
                </div>

                <div className="overflow-y-auto custom-scrollbar pr-2">
                  <div className="bg-[#003d3d] p-6 rounded-3xl border border-[#006666] mb-8">
                    <h4 className="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2"><span className="text-[#D4AF37]">✚</span> Khai báo tài liệu mới</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="TÊN TÀI LIỆU" className="p-4 bg-black/20 border border-teal-800 rounded-xl text-white outline-none focus:border-[#D4AF37]" />
                      <input value={formExamLink} onChange={e => setFormExamLink(e.target.value)} placeholder="LINK TÀI LIỆU" className="p-4 bg-black/20 border border-teal-800 rounded-xl text-white outline-none focus:border-[#D4AF37]" />
                      <input value={formAnswerLink} onChange={e => setFormAnswerLink(e.target.value)} placeholder="LINK ĐÁP ÁN" className="p-4 bg-black/20 border border-teal-800 rounded-xl text-white outline-none focus:border-[#D4AF37]" />
                      <input value={formGuideLink} onChange={e => setFormGuideLink(e.target.value)} placeholder="LINK BÀI GIẢI CHI TIẾT" className="p-4 bg-black/20 border border-teal-800 rounded-xl text-white outline-none focus:border-[#D4AF37]" />
                    </div>
                    <button onClick={handleAddFile} className="mt-6 w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl transition-all shadow-lg uppercase tracking-widest">Xác nhận khai báo</button>
                  </div>

                  <h4 className="text-xs font-black text-teal-400 mb-4 uppercase tracking-[0.2em]">Danh sách tài liệu đã đăng</h4>
                  <div className="space-y-3 pb-6">
                    {declaredFiles.filter(f => f.category === selectedCategory).map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-black/20 border border-[#006666] rounded-2xl group text-left">
                        <div className="truncate pr-4">
                          <p className="text-white font-bold">{file.name}</p>
                          <p className="text-teal-600 text-[10px] uppercase font-black truncate">{file.examLink}</p>
                        </div>
                        <button onClick={() => handleDeleteFile(file.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0">🗑 XÓA</button>
                      </div>
                    ))}
                    {declaredFiles.filter(f => f.category === selectedCategory).length === 0 && <p className="text-teal-700 italic text-sm text-center">Chưa có dữ liệu cho mục này.</p>}
                  </div>
                </div>
              </div>
            )}

            {portView === 'student-view' && (
              <div className="flex-1 overflow-y-auto custom-scrollbar animate-in slide-in-from-right-4 pr-2">
                <div className="flex items-center justify-between mb-8 border-b border-[#D4AF37]/20 pb-4">
                  <button onClick={goBackToPortChoice} className="text-teal-400 hover:text-[#D4AF37] text-sm font-black uppercase flex items-center gap-2">← Quay lại cổng</button>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">TÀI LIỆU HỌC SINH</h3>
                    <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">{selectedCategory}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 pb-6">
                  {declaredFiles.filter(f => f.category === selectedCategory).length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center">
                      <span className="text-5xl opacity-20 mb-4">📭</span>
                      <p className="text-teal-500 italic mb-6">Chưa có tài liệu nào được cập nhật trong danh mục này.</p>
                    </div>
                  ) : (
                    declaredFiles.filter(f => f.category === selectedCategory).map((file) => (
                      <div key={file.id} className="bg-[#003d3d]/80 border border-[#006666] p-6 rounded-3xl hover:border-[#D4AF37] transition-all shadow-xl text-left group">
                        <h5 className="text-xl font-black text-white mb-6 flex items-center gap-3">📄 {file.name}</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <a href={file.examLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-teal-900/50 text-teal-300 border border-teal-500/30 rounded-xl font-bold text-xs hover:bg-teal-700 hover:text-white transition-all uppercase">📥 Tải Tài liệu</a>
                          <a href={file.answerLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-blue-900/30 text-blue-300 border border-blue-500/30 rounded-xl font-bold text-xs hover:bg-blue-700 hover:text-white transition-all uppercase">✅ Xem Đáp án</a>
                          <a href={file.guideLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl font-bold text-xs hover:bg-[#D4AF37] hover:text-[#003d3d] transition-all uppercase">💡 Giải chi tiết</a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showGuideModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl overflow-y-auto py-10">
          <div className="max-w-4xl w-full bg-[#004d4d] border border-[#D4AF37]/30 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative text-left max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setShowGuideModal(false)} className="sticky top-0 self-end float-right -mt-2 -mr-2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#D4AF37] text-[#003d3d] z-20 font-black shadow-lg hover:rotate-90 transition-all">✕</button>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10 uppercase tracking-widest border-b-4 border-[#D4AF37] pb-4 inline-block">CẨM NANG SỬ DỤNG</h3>
            <div className="space-y-12">
              <section className="bg-teal-900/20 p-6 md:p-8 rounded-[2rem] border border-teal-500/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-2xl font-black text-[#003d3d] shadow-lg">1</div>
                  <h4 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase tracking-tight">KHO TÀI LIỆU PHONG PHÚ</h4>
                </div>
                <div className="space-y-6 md:pl-16">
                  <p className="text-slate-300">Nhấn vào thẻ <b>KHO TÀI LIỆU PHONG PHÚ</b> tại trang chủ:</p>
                  <ul className="text-slate-300 space-y-3 text-sm md:text-base ml-4">
                    <li>• Chọn một trong 4 danh mục tài liệu trọng tâm.</li>
                    <li>• Chọn <b>Cổng Học Sinh</b> để tải đề, xem đáp án và hướng dẫn giải.</li>
                    <li>• <b>Cổng Giáo Viên</b> dành riêng cho việc cập nhật học liệu (yêu cầu mật khẩu).</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {showWelcomeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/95 backdrop-blur-md overflow-y-auto py-10">
          <div className="max-w-4xl w-full bg-[#004d4d] border border-[#D4AF37]/30 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative flex flex-col items-center max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowWelcomeModal(false)} className="sticky top-0 self-end -mt-2 -mr-2 w-10 h-10 flex items-center justify-center rounded-full bg-[#D4AF37] text-[#003d3d] hover:rotate-90 transition-all z-20 font-black shadow-lg mb-4">✕</button>
            <div className="w-full text-center py-10">
              <h3 className="text-2xl font-black text-[#D4AF37] mb-8 uppercase tracking-widest">CHÀO MỪNG TRUY CẬP HỆ THỐNG</h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
                <div onClick={() => { setShowFolders(true); setShowWelcomeModal(false); setPortView('selection'); }} className="flex-1 p-10 bg-[#003d3d] border border-[#006666] rounded-3xl hover:border-[#D4AF37] transition-all group shadow-xl cursor-pointer">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📚</div>
                  <p className="text-lg font-black text-white uppercase mb-1">KHO TÀI LIỆU</p>
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest">Học liệu tổng hợp</p>
                </div>
                <div onClick={handleLuyenDeClick} className="flex-1 p-10 bg-[#003d3d] border border-[#006666] rounded-3xl hover:border-[#D4AF37] transition-all group shadow-xl cursor-pointer">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌏</div>
                  <p className="text-lg font-black text-white uppercase mb-1">KHẢO THÍ ONLINE</p>
                  <p className="text-teal-300 text-[10px] font-black uppercase tracking-widest">Đề thi 2026 chính thức</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard: React.FC<{icon: string, title: string, subtitle?: string, desc: string, visitors?: number}> = ({ icon, title, subtitle, desc, visitors }) => {
  return (
    <div className="p-6 md:p-8 h-full bg-[#004d4d]/60 border border-teal-500/20 rounded-[2.5rem] shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)] hover:-translate-y-3 transition-all duration-500 group flex flex-col items-center min-h-[400px] md:min-h-[440px] relative overflow-hidden backdrop-blur-md border-t-teal-400/20">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {visitors !== undefined && (
        <div className="mb-4 px-3 py-1 bg-black/40 border border-teal-500/30 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] md:text-xs font-bold text-teal-300 uppercase tracking-wider">Số thí sinh đăng nhập: <span className="text-white">{visitors.toLocaleString()}</span></span>
        </div>
      )}
      <div className="text-5xl md:text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">{icon}</div>
      <h3 className="text-lg md:text-xl font-black text-[#D4AF37] mb-2 uppercase tracking-tight text-center leading-tight group-hover:text-[#FCF6BA] transition-colors drop-shadow-md">{title}</h3>
      {subtitle && <p className="text-[10px] md:text-xs font-black text-teal-300 mb-4 px-2 italic text-center uppercase tracking-widest">{subtitle}</p>}
      <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-8 px-4 text-center font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">{desc}</p>
      <div className="mt-auto px-8 py-3 bg-[#003d3d] border border-teal-500/30 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-xl group-hover:bg-[#D4AF37] group-hover:text-[#003d3d] transition-all duration-300 transform active:scale-95">KHÁM PHÁ</div>
    </div>
  );
};

export default Hero;
