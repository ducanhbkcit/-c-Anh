
import { TthcItem } from './types';

export const NOTEBOOK_ID_VP = 'c5295e23-1ce8-4385-a622-46a9a7b23f90';
export const NOTEBOOK_URL_VP = `https://notebooklm.google.com/notebook/${NOTEBOOK_ID_VP}`;
export const NOTEBOOK_ID_PKT = '5cdbc2b5-c953-4d2c-a8f9-3676e0d55dfc';
export const NOTEBOOK_URL_PKT = `https://notebooklm.google.com/notebook/${NOTEBOOK_ID_PKT}`;

const tthcListRaw = [
    "1.013949 - Giao đất, cho thuê đất, chuyển mục đích sử dụng đất",
    "1.013952 - Điều chỉnh quyết định giao đất, cho thuê đất",
    "1.013953 - Cấp Giấy chứng nhận cho người nhận chuyển nhượng",
    "1.013954 - Gia hạn, điều chỉnh thời hạn sử dụng đất",
    "1.013955 - Chuyển đổi quyền sử dụng đất nông nghiệp",
    "1.013956 - Chuyển nhượng, cho thuê, thừa kế, tặng cho",
    "1.013957 - Đính chính Giấy chứng nhận đã cấp",
    "1.013958 - Thu hồi Giấy chứng nhận đã cấp (theo yêu cầu)",
    "1.013959 - Đăng ký biến động do thay đổi thông tin",
    "1.013960 - Cấp Giấy chứng nhận lần đầu",
    "1.013961 - Tách thửa, hợp thửa đất",
    "1.013962 - Đăng ký góp vốn bằng quyền sử dụng đất",
    "1.012818 - Thu hồi Giấy chứng nhận đã cấp không đúng quy định và cấp lại",
    "1.013967 - Giải quyết tranh chấp đất đai thuộc thẩm quyền cấp xã",
    "1.013975 - Hòa giải tranh chấp đất đai tại UBND cấp xã",
    "1.012819 - Bồi thường, hỗ trợ khi Nhà nước thu hồi đất",
    "1.012820 - Người SDĐ tự nguyện trả lại đất",
    "1.012821 - Tặng cho QSDĐ vì mục đích giao thông, công cộng",
];

const tthcIcons: { [key: string]: string } = {
    "1.013949": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>', // Map
    "1.013952": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5l-3 3v4.2l-4.5 4.5l-3-3v4.2L4.5 19l-3 3"></path><path d="M22 13a4.5 4.5 0 0 1-9 0"></path><path d="M16 5l-1.4 1.4"></path><path d="M10 11l-1.4 1.4"></path></svg>', // FilePen
    "1.013953": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2l4-4"></path></svg>', // FileCheck
    "1.013954": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', // Clock
    "1.013955": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>', // Exchange
    "1.013956": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18s-3 3-5 5L2 18s3-3 5-5m10 5s3 3 5 5l-5 5s-3-3-5-5M8 6h.01M16 6h.01M12 2v4M12 18v4"></path></svg>', // Handshake
    "1.013957": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>', // PlusSquare
    "1.013958": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>', // Trash
    "1.013959": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V7H4v10a2 2 0 0 0 2 2h8"></path><path d="M18 20l2 2l4-4"></path><path d="M18 10a2 2 0 1 1-4 0a2 2 0 0 1 4 0z"></path></svg>', // RotateCw
    "1.013960": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="15" x2="12" y2="18"></line><line x1="10.5" y1="16.5" x2="13.5" y2="16.5"></line></svg>', // FilePlus
    "1.013961": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"></path><line x1="12" y1="3" x2="12" y2="21"></line></svg>', // SplitSquare
    "1.013962": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-4a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4h-4"></path><line x1="12" y1="18" x2="12" y2="6"></line></svg>', // Dollar
    "1.012818": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>', // AlertTriangle
    "1.013967": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-1.6 0-3-1.4-3-3V3h6v15c0 1.6-1.4 3-3 3z"></path><path d="M12 3L6 9h12z"></path></svg>', // Scale
    "1.013975": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6.4 16.4a2 2 0 0 0 2.2 2.2L20 13L11 5z"></path><path d="M20 13l-4.6 4.6a2 2 0 0 1-2.2 2.2L4 14l9-9z"></path></svg>', // Handshake
    "1.012819": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="18" r="4"></circle><path d="M16 18H8m-4 0v-2a6 6 0 0 1 6-6h2"></path><circle cx="17" cy="7" r="3"></circle></svg>', // Coins
    "1.012820": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12h-8L9 2l-4 4"></path><path d="M3 18c-1.33 0-2-1.33-2-3s.67-3 2-3h18"></path></svg>', // RotateCcw
    "1.012821": '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78l1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>', // Heart
};

export const tthcData: TthcItem[] = tthcListRaw.map(item => {
    const [maSo, tenThuTuc] = item.split(" - ");
    return { maSo, tenThuTuc, icon: tthcIcons[maSo] || '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>' };
});

export const newKnowledgeSources = [
    "https://docs.google.com/document/d/1GXxouhNvUonOyQ-QuJUJkxjn-rQ_ec3OvMZL19Xc868/edit",
    "https://docs.google.com/document/d/1O8NdQF1ztMC5yVYak3rWCbYIvlSj4m85gr1jTfxF6Xc/edit"
];

const primaryLegalTags = `
**QUY TẮC PHÁP LÝ**: ƯU TIÊN SỬ DỤNG Luật Đất đai 2024 (Nghị định 151, 226/2025/NĐ-CP và các Quy định hiện hành). Nếu có mâu thuẫn, áp dụng Luật chuyên ngành (Luật Đất đai 2024). KHÔNG sử dụng hoặc trích dẫn dữ liệu Mật.
`;

export const functionalPrompts: { [key: string]: (yeuCau: string, m4Action: string) => string } = {
    "Trình tự Thủ tục": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang cần rà soát quy trình để hướng dẫn người dân cho thủ tục [${yeuCau.trim()}].
# (YÊU CẦU): Hãy trình bày tổng quan và chi tiết **Trình tự Thủ tục** thực hiện đảm bảo quy định hiện hành (Nghị định 151, 226/2025/NĐ-CP và các Quy định hiện hành).
# (CÁC BƯỚC): 1. Xác định đúng thủ tục. 2. Liệt kê các bước thực hiện tuần tự. 3. Với mỗi bước, nêu rõ cơ quan chủ trì, cơ quan phối hợp, và kết quả đầu ra.
# (MỤC TIÊU CUỐI CÙNG): Xuất **Sơ đồ quy trình** (dạng văn bản) và **Checklist các mốc thời gian**. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
    "Hồ sơ, Giấy tờ": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang cần chuẩn bị bộ hồ sơ hoàn chỉnh cho thủ tục [${yeuCau.trim()}].
# (YÊU CẦU): Hãy liệt kê chi tiết **Hồ sơ, Giấy tờ** cần thiết để nộp. Lưu ý các giấy tờ cần được **công chứng/chứng thực** (nếu có).
# (CÁC BƯỚC): 1. Xác định thành phần hồ sơ theo Nghị định 226/2025/NĐ-CP. 2. Phân loại giấy tờ: bắt buộc, thay thế (nếu có), và giấy tờ phải công chứng.
# (MỤC TIÊU CUỐI CÙNG): Xuất **Bảng kê Hồ sơ** dưới dạng Checklist, có ghi chú rõ ràng về các **Biểu Mẫu** cần điền. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
    "Công văn": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang soạn Công văn gấp.
# (YÊU CẦU): Soạn Công văn [Trích yếu: ${yeuCau.trim()}] gửi [Đơn vị/Cấp có thẩm quyền]. Nội dung phải chứa thông tin được cung cấp trong yêu cầu.
# (CÁC BƯỚC): 1. Phân tích yêu cầu và xác định căn cứ pháp lý liên quan. 2. Soạn nội dung theo cấu trúc hành chính. 3. Thêm bảng căn cứ pháp lý.
# (MỤC TIÊU CUỐI CÙNG): Xuất Công văn chuẩn **Nghị định 30/2020/NĐ-CP** (về thể thức) + Bảng căn cứ chi tiết + **Checklist Pháp lý**. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
    "Tờ trình": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang lập Tờ trình để trình cấp trên.
# (YÊU CẦU): Soạn Tờ trình về [Nội dung: ${yeuCau.trim()}]. Trình [UBND cấp xã/huyện]. Tờ trình phải chứa thông tin được cung cấp trong yêu cầu.
# (CÁC BƯỚC): 1. Xác định thẩm quyền giải quyết. 2. Tra cứu căn cứ pháp lý mới nhất. 3. Xây dựng Tờ trình theo thể thức hành chính, tập trung vào tính thuyết phục.
# (MỤC TIÊU CUỐI CÙNG): Xuất Tờ trình chuẩn **Nghị định 30/2020/NĐ-CP, Nghị định 151, 226/2025/NĐ-CP và các Quy định hiện hành** + Checklist các điểm cần điền chi tiết. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
    "Báo cáo": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang soạn Báo cáo định kỳ/đột xuất.
# (YÊU CẦU): Soạn Báo cáo về [Công VIệc, Tiến độ, yêu cầu thực hiện, Báo cáo nhiệm vụ Kinh tế]: ${yeuCau.trim()}. Nội dung Báo cáo phải phản ánh tình hình giải quyết công việc.
# (CÁC BƯỚC): 1. Xác định các chỉ tiêu liên quan. 2. Trích đúng Điều/Khoản/Điểm từ VB mới nhất. 3. Đề xuất giải pháp.
# (MỤC TIÊU CUỐI CÙNG): Xuất Báo cáo chuẩn thể thức hành chính, kèm theo **Bảng tổng hợp số liệu** và **Danh mục Vướng mắc/Kiến nghị** có trích dẫn pháp lý. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
    "Dự thảo Quyết định": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang lập Dự thảo Quyết định để trình Chủ tịch UBND xã.
# (YÊU CẦU): Lập Dự thảo Quyết định về [Nội dung: ${yeuCau.trim()}]. Quyết định phải có đầy đủ các yếu tố: Căn cứ pháp lý, Xét đề nghị, Quyết định và Điều khoản thi hành.
# (CÁC BƯỚC): 1. Xác định đúng thẩm quyền ban hành Quyết định (Luật tổ chức chính quyền địa Phương 2025, Luật Đất đai năm 2024,Nghị định 151, 226/2025/NĐ-CP và các Quy định hiện hành). 2. Xây dựng Căn cứ Pháp lý (Luật Đất đai 2024, NĐ hợp nhất, Quyết định UBND tỉnh Đồng Nai(còn hiệu lực)...). 3. Soạn thảo các Điều khoản cụ thể.
# (MỤC TIÊU CUỐI CÙNG): Xuất Dự thảo Quyết định chuẩn **Luật đất đai, Nghị định 30/2020/NĐ-CP, Nghị định 151, 226/2025/NĐ-CP và các Quy định hiện hành** + **Bảng Kiểm tra Nguồn Pháp lý** để tôi thẩm định. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
    "Rà soát Pháp lý": (yeuCau, m4Action) => `
# (VAI TRÒ): Tôi, Chuyên viên Phòng Kinh tế xã, đang thực hiện rà soát pháp lý chuyên sâu.
# (YÊU CẦU): Thực hiện Rà soát pháp lý cho [Văn bản/Hồ sơ/Yêu cầu: ${yeuCau.trim()}].
# (CÁC BƯỚC): 1. Phân tích nội dung và đối chiếu từng điều khoản với Luật Đất đai 2024 và **các Nghị định 151, 226/2025/NĐ-CP và các Quy định hiện hành**. 2. Kiểm tra tính hiệu lực của từng căn cứ pháp lý được trích dẫn. 3. Đề xuất hành động.
# (MỤC TIÊU CUỐI CÙNG): Xuất: (A) **Bảng Kiểm Pháp Lý**. (B) **Đề xuất sửa đổi chi tiết**. (C) Nếu vượt thẩm quyền → ghi rõ **“CHUYỂN PHÒNG PHÁP CHẾ”**. Bắt buộc thực hiện **${m4Action}** sau khi soạn thảo.
# (GIỚI HẠN & RÀNG BUỘC): ${primaryLegalTags}
`,
};

export function determineM4Action(query: string): string {
    const lowerQuery = query.toLowerCase();
    let action = "kiểm tra lại nội dung";

    if (lowerQuery.includes('google drive') || lowerQuery.includes('drive')) {
        action = "Lưu trữ bản nháp trên Google Drive cá nhân";
    } else if (lowerQuery.includes('google docs') || lowerQuery.includes('docs') || lowerQuery.includes('đồng bộ')) {
        action = "Lưu trữ bản nháp trên Docs để chỉnh sửa đồng bộ với đồng nghiệp";
    } else if (lowerQuery.includes('trình ký')) {
        action = "Chuẩn bị để trình ký ngay lập tức";
    } else if (lowerQuery.includes('email') || lowerQuery.includes('gửi mail')) {
        action = "Gửi bản nháp qua email cho Phòng ban liên quan để lấy ý kiến";
    } else if (lowerQuery.includes('chia sẻ')) {
        action = "Lưu trữ trên Docs và chia sẻ ngay với người yêu cầu";
    } else if (lowerQuery.includes('lưu trữ') && lowerQuery.includes('chia sẻ')) {
        action = "Lưu trữ và chia sẻ ngay lập tức theo yêu cầu đã nêu";
    }

    if (action === "kiểm tra lại nội dung" && query.length > 30) {
        action = "kiểm tra lại nội dung trước khi ban hành";
    }

    return action;
}
