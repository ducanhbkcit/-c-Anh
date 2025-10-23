
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TthcItem } from './types';
import { tthcData, functionalPrompts, determineM4Action, newKnowledgeSources, NOTEBOOK_URL_PKT, NOTEBOOK_URL_VP } from './constants';

const Marquee: React.FC = () => {
    const text = "🇻🇳 Chúng ta cùng Thượng tôn Hiến pháp và Pháp luật, tạo động lực đưa đất nước bước vào kỷ nguyên vươn mình của dân tộc. Tôi Yêu Việt Nam 🇻🇳";
    
    const fireworks = useMemo(() => Array.from({ length: 20 }).map((_, i) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            '--x': `${(Math.random() - 0.5) * 300}px`,
            '--y': `${(Math.random() - 0.5) * 300}px`,
        };
        return <div key={i} className="firework" style={style}></div>;
    }), []);

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {text.split('').map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.1}s, ${index * 0.05}s` }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>
            {fireworks}
        </div>
    );
};

const App: React.FC = () => {
    const [selectedTthc, setSelectedTthc] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [userQuery, setUserQuery] = useState('');
    const [generatedPromptHtml, setGeneratedPromptHtml] = useState<string>(
        '<p class="text-center text-gray-500 italic">Vui lòng hoàn thành đủ 3 bước để **XÂY DỰNG CÂU LỆNH** chuyên sâu...</p>'
    );
    const [lastRawPrompt, setLastRawPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('COPY CÂU LỆNH TỐI ƯU');
    
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header-soft-glow');
            if (header && window.scrollY > header.clientHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const formatPromptForDisplay = useCallback((promptText: string) => {
        let htmlContent = promptText.replace(/\n/g, '<br>');
        const tags = ['#(VAI TRÒ)', '#(YÊU CẦU)', '#(CÁC BƯỚC)', '#(MỤC TIÊU CUỐI CÙNG)', '#(GIỚI HẠN & RÀNG BUỘC)'];
        tags.forEach(tag => {
            const safeTag = tag.replace('(', '\\(').replace(')', '\\)');
            const regex = new RegExp(safeTag, 'g');
            htmlContent = htmlContent.replace(regex, `<span class="text-blue-600 font-bold">${tag}</span>`);
        });
        htmlContent = htmlContent.replace(/\[(.*?)\]/g, (_, p1) => `<span class="text-red-500 font-bold">[${p1}]</span>`);
        htmlContent = htmlContent.replace(/Nghị định 30\/2020\/NĐ-CP/g, `<span class="text-green-600 font-bold">Nghị định 30/2020/NĐ-CP</span>`);
        htmlContent = htmlContent.replace(/Luật Đất đai 2024/g, `<span class="text-green-600 font-bold">Luật Đất đai 2024</span>`);
        htmlContent = htmlContent.replace(/VĂN BẢN HỢP NHẤT NĐ 151 và NĐ 226\/2025\/NĐ-CP/g, `<span class="text-purple-600 font-extrabold">VĂN BẢN HỢP NHẤT NĐ 151 và NĐ 226/2025/NĐ-CP</span>`);
        htmlContent = htmlContent.replace(/Bắt buộc thực hiện (.*?) sau khi soạn thảo./g, (match) => `<span class="text-orange-600 font-bold">${match}</span>`);
        return htmlContent;
    }, []);

    const handleGeneratePrompt = useCallback(() => {
        setIsLoading(true);
        const minConditionMet = selectedAction || selectedTthc || userQuery.trim();
        if (!minConditionMet) {
            setGeneratedPromptHtml('<p class="text-center text-red-600 italic">⚠️ Vui lòng cung cấp ít nhất một đầu vào (TTHC, Hành động, hoặc Yêu cầu) để xây dựng câu lệnh!</p>');
            setIsLoading(false);
            return;
        }

        let promptType = selectedAction;
        if (!promptType) {
            const uq = userQuery.toLowerCase();
            promptType = uq.includes('công văn') ? 'Công văn' :
                uq.includes('tờ trình') ? 'Tờ trình' :
                uq.includes('báo cáo') ? 'Báo cáo' :
                'Rà soát Pháp lý';
        } else if (!promptType) {
            promptType = 'Trình tự Thủ tục';
        }

        const generatorFunction = functionalPrompts[promptType || 'Trình tự Thủ tục'];
        const m4Action = determineM4Action(userQuery);
        const tthcTag = selectedTthc ? `[TTHC: ${selectedTthc}]` : '';

        let finalYeuCau = userQuery.trim();
        if (selectedTthc && !userQuery.includes(selectedTthc)) {
            finalYeuCau = `${tthcTag} - ${userQuery}`;
        } else if (selectedTthc && userQuery.trim() === '') {
            finalYeuCau = tthcTag;
        }

        const generatedPrompt = generatorFunction(finalYeuCau, m4Action);
        let rawPromptContent = generatedPrompt.replace(/<br>/g, '\n').replace(/<span.*?>(.*?)<\/span>/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1').trim();
        rawPromptContent += `\n\n**NGUỒN TƯ DUY NỘI BỘ BẮT BUỘC**: Tham khảo các file đã tải lên và các nguồn: ${newKnowledgeSources.join('; ')}`;

        setLastRawPrompt(rawPromptContent);
        setGeneratedPromptHtml(formatPromptForDisplay(generatedPrompt));
        setIsLoading(false);
    }, [selectedAction, selectedTthc, userQuery, formatPromptForDisplay]);
    
    const copyPromptToClipboard = useCallback(() => {
        if (!lastRawPrompt || lastRawPrompt.includes('Vui lòng hoàn thành đủ 3 bước')) {
            setGeneratedPromptHtml('<p class="text-center text-red-600 font-bold italic">⚠️ CÂU LỆNH CHƯA HỢP LỆ! Vui lòng xây dựng câu lệnh trước khi sao chép.</p>');
            setTimeout(() => { handleGeneratePrompt() }, 2000);
            return null;
        }

        const finalCopyText = lastRawPrompt.replace(/\n\n\*\*NGUỒN TƯ DUY NỘI BỘ BẮT BUỘC\*\*:(.|\n)*$/g, '').trim();
        navigator.clipboard.writeText(finalCopyText);
        setCopyButtonText('ĐÃ SAO CHÉP!');
        setTimeout(() => setCopyButtonText('COPY CÂU LỆNH TỐI ƯU'), 1500);
        return finalCopyText;
    }, [lastRawPrompt, handleGeneratePrompt]);

    const packageAndExecute = useCallback((type: 'pkt' | 'vp') => {
        if (!lastRawPrompt || lastRawPrompt.includes('Vui lòng hoàn thành đủ 3 bước')) {
            handleGeneratePrompt();
        }
        
        setTimeout(() => { // ensure state is updated from handleGeneratePrompt
            const copiedPrompt = copyPromptToClipboard();
            if(!copiedPrompt) {
                 setGeneratedPromptHtml('<p class="text-center text-red-600 font-bold italic">⚠️ Vui lòng hoàn thành ít nhất 1 bước đầu vào trước khi kết nối MINI AI.</p>');
                 return;
            }

            const notebookURL = type === 'vp' ? NOTEBOOK_URL_VP : NOTEBOOK_URL_PKT;
            const assistantName = type === 'vp' ? 'Trợ lý VP UBND xã' : 'Trợ lý PKT xã/phường';
            window.open(notebookURL, '_blank');

            const newHtml = `
                <div class="text-center text-green-700 p-4">
                    <p class="font-bold text-lg mb-2">✅ ĐÃ SAO CHÉP CÂU LỆNH TỐI ƯU THÀNH CÔNG!</p>
                    <p class="text-sm">MINI AI đã mở ${assistantName} (Link: <a href="${notebookURL}" target="_blank" class="text-blue-500 underline">Mở NotebookLM</a>).</p>
                    <p class="text-sm mt-1 font-bold text-red-600">Bước cuối cùng: Vui lòng chuyển sang tab NotebookLM vừa mở và <span class="bg-yellow-200 px-1 rounded">DÁN (Ctrl+V)</span> câu lệnh vào Chatbox để AI thực thi ngay lập tức.</p>
                </div>
                <hr class="my-4">
                ${formatPromptForDisplay(copiedPrompt)}
            `;
            setGeneratedPromptHtml(newHtml);
        }, 100);

    }, [lastRawPrompt, handleGeneratePrompt, copyPromptToClipboard, formatPromptForDisplay]);

    const selectText = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        if (!container || !lastRawPrompt) return;
        const selection = window.getSelection();
        if(selection) {
            const range = document.createRange();
            range.selectNodeContents(container);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    return (
        <div 
          className="p-4 md:p-12"
          style={{
            backgroundImage: `url('https://content-fetcher-urls.googleusercontent.com/uploaded:Web01.jpg-07d7f515-ebae-4e43-8405-c585fd2763c6')`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
          }}
        >
            <header className="header-soft-glow rounded-xl mb-6 text-center">
                <h1 className="text-4xl font-extrabold title-soft-glow text-white tracking-wider">
                    BỘ CÔNG CỤ HỖ TRỢ TÁC NGHIỆP PHÒNG KINH TẾ XÃ/PHƯỜNG
                </h1>
                <p className="text-sm mt-2 text-white/90">
                    Nội dung được xây dựng dựa trên cấu trúc dữ liệu và Hệ thống AI Suy luận Pháp lý do _(ducanh.bkcit)_ đang xây dựng và hoàn thiện
                </p>
            </header>
            
            <Marquee />

            <a href="https://chatgpt.com/share/68f0f670-d124-800b-b5dc-dc6284c57cdf" target="_blank" rel="noopener noreferrer" className="w-full block mb-10">
                <div id="data-cleaning-banner" className="text-white text-center py-4 px-6 rounded-xl text-xl md:text-2xl tracking-wide">
                    Kế hoạch làm sạch Dữ liệu đất đai (90 Ngày)
                </div>
            </a>

            <div id="sticky-header" className={`sticky top-0 z-50 bg-blue-800 text-white p-2 border-b-3 border-blue-400 shadow-lg transition-opacity duration-300 text-center font-sans ${isSticky ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <p className="text-sm font-semibold">
                    Nội dung được xây dựng dựa trên cấu trúc dữ liệu và Hệ thống AI Suy luận Pháp lý do _(ducanh.bkcit)_ đang xây dựng và hoàn thiện
                </p>
            </div>

            <div className="max-w-7xl mx-auto space-y-10">
                {/* Step 1 */}
                <div className="custom-card p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">Bước 1: Chọn Thủ tục Hành chính (cấp xã/phường)</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {tthcData.map((item) => (
                            <button
                                key={item.maSo}
                                onClick={() => setSelectedTthc(item.tenThuTuc)}
                                className={`tthc-button button-with-effect text-xs py-2 px-3 rounded-lg transition duration-150 ease-in-out ${selectedTthc === item.tenThuTuc ? 'selected' : ''}`}
                            >
                                <span className="border-line top-line"></span><span className="border-line right-line"></span><span className="border-line bottom-line"></span><span className="border-line left-line"></span>
                                <span className="icon-wrapper" dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                <span className="tthc-text">{item.tenThuTuc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2 */}
                <div className="custom-card p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">Bước 2: Chọn Hành động Chức năng (Loại Tài liệu/Phân tích)</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        {['Trình tự Thủ tục', 'Hồ sơ, Giấy tờ', 'Công văn', 'Tờ trình', 'Báo cáo', 'Dự thảo Quyết định', 'Rà soát Pháp lý'].map((action, i) => (
                            <button key={action} onClick={() => setSelectedAction(action)} className={`func-button button-with-effect ${['bg-blue-500', 'bg-cyan-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-gray-600'][i]} text-white py-3 px-2 rounded-lg ${selectedAction === action ? 'selected' : ''}`}>
                                <span className="border-line top-line"></span><span className="border-line right-line"></span><span className="border-line bottom-line"></span><span className="border-line left-line"></span>
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 3 */}
                <div className="custom-card p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Bước 3: Nhập Yêu cầu Tùy biến (Chi tiết công việc)</h2>
                    <textarea value={userQuery} onChange={(e) => setUserQuery(e.target.value)} rows={2} placeholder="NHẬP YÊU CẦU CÔNG VIỆC... (Ví dụ: hiện trạng thửa đất, quy hoạch, thời điểm khai phá, tình trạng sử dụng đất ....)" className="w-full p-4 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none shadow-inner"></textarea>
                    <div className="mt-5 flex justify-center">
                        <button onClick={handleGeneratePrompt} disabled={isLoading} className="execute-button button-with-effect text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center justify-center disabled:opacity-50">
                            <span className="border-line top-line"></span><span className="border-line right-line"></span><span className="border-line bottom-line"></span><span className="border-line left-line"></span>
                            <span id="button-text" className="relative z-10">{isLoading ? 'ĐANG XỬ LÝ...' : 'XÂY DỰNG CÂU LỆNH'}</span>
                             {isLoading && <div className="spinner ml-3 border-t-2 border-white rounded-full w-5 h-5 animate-spin"></div>}
                        </button>
                    </div>
                     <div className="mt-4 flex flex-wrap justify-center gap-4">
                        <button onClick={() => packageAndExecute('pkt')} className="notebook-button button-with-effect bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg flex items-center">
                            <span className="border-line top-line"></span><span className="border-line right-line"></span><span className="border-line bottom-line"></span><span className="border-line left-line"></span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-9a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 110 2h-6a1 1 0 110-2h6z" clipRule="evenodd" /></svg>
                             Trợ lý PKT xã//phường
                        </button>
                         <button onClick={() => packageAndExecute('vp')} className="notebook-button button-with-effect bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-lg flex items-center">
                            <span className="border-line top-line"></span><span className="border-line right-line"></span><span className="border-line bottom-line"></span><span className="border-line left-line"></span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-9a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 110 2h-6a1 1 0 110-2h6z" clipRule="evenodd" /></svg>
                             Trợ lý VP UBND xã
                        </button>
                     </div>
                     <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-bold text-gray-600 mb-3 text-center">Tích hợp Dữ liệu Nguồn Chuyên sâu</h3>
                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                           <button onClick={() => alert('Mô phỏng: Tính năng này yêu cầu môi trường Backend để mở Drive Picker. Trong môi trường thực tế, Anh sẽ chọn file từ Google Drive để bổ sung nguồn cho NotebookLM.')} className="notebook-button button-with-effect bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-base flex items-center">
                                <span className="border-line top-line"></span><span className="border-line right-line"></span><span className="border-line bottom-line"></span><span className="border-line left-line"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 10a.5.5 0 01.5-.5h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" /><path fillRule="evenodd" d="M3 3a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 1h4V3H5v1zm1 7a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H7a1 1 0 01-1-1v-5zm2 1h4v4H8v-4z" clipRule="evenodd" /></svg>
                                THÊM FILE DỮ LIỆU NGUỒN
                           </button>
                        </div>
                     </div>
                </div>

                {/* Result Display */}
                <div className="custom-card p-8 rounded-xl">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-bold text-gray-700">
                            Câu lệnh được tối ưu hóa:
                            <span className="text-blue-600 font-extrabold ml-2">
                                {selectedTthc || '[Chưa chọn TTHC]'}
                                {selectedAction && ` | Hành động: ${selectedAction}`}
                            </span>
                        </h2>
                        <button onClick={copyPromptToClipboard} className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-150 ease-in-out flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0l-4 4m4-4V3" /></svg>
                            <span>{copyButtonText}</span>
                        </button>
                    </div>
                    <div id="result-container">
                        <div
                            onClick={selectText}
                            className="text-gray-700 whitespace-pre-wrap text-sm max-h-[36rem] overflow-y-auto bg-gray-50 p-4 rounded-md shadow-inner cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: generatedPromptHtml }}
                        ></div>
                    </div>
                </div>

                 {/* Checklist */}
                <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-300">
                    <h3 className="text-xl font-bold text-red-600 mb-4">📌 Mini-checklist Tự kiểm tra Prompt</h3>
                    <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
                        <li className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-start">
                            <span className="text-green-500 font-extrabold mr-2">✅</span>
                            <span><b>Trích dẫn đủ Điều/Khoản/Điểm?</b> (Yêu cầu AI phải nêu rõ)</span>
                        </li>
                         <li className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-start">
                            <span className="text-green-500 font-extrabold mr-2">✅</span>
                            <span><b>Chuẩn thể thức NĐ30/2020?</b> (Yêu cầu AI áp dụng)</span>
                        </li>
                         <li className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-start">
                            <span className="text-green-500 font-extrabold mr-2">✅</span>
                            <span><b>Ưu tiên VB mới nhất (ghi rõ VB thay thế)?</b> (Cơ chế Suy luận Pháp lý đã tích hợp)</span>
                        </li>
                         <li className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-start">
                            <span className="text-green-500 font-extrabold mr-2">✅</span>
                            <span><b>Có checklist trích dẫn + tóm tắt pháp lý?</b> (Yêu cầu định dạng đầu ra)</span>
                        </li>
                         <li className="p-3 bg-red-100 border border-red-300 rounded-md shadow-sm text-red-700 font-bold flex items-start">
                            <span className="text-red-700 font-extrabold mr-2">⚠️</span>
                            <span><b>Đảm bảo dữ liệu an toàn thông tin mạng và Quy định về dữ liệu "Mật"?</b> (Kiểm tra lại nội dung trước khi dán vào AI)</span>
                        </li>
                    </ul>
                    <p className="mt-8 text-sm text-gray-600 text-center">
                        Product by ducanh.bkcit<br />
                        090.1951.525 _Zalo 085.974.9525
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
