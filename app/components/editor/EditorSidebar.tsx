import { ChevronDown, ChevronUp, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { Block, BlockType, Field } from './types/editor';
import PropsEditor from './PropsEditor';
import { cn } from '@/lib/utils';

interface EditorSidebarProps {
    blocks: Block[];
    openId: string | null;
    setOpenId: (id: string | null) => void;
    toggleVisibility: (id: string) => void;
    triggerReset: (id: string) => void;
    handleUpdateProps: (id: string, newProps: Record<string, string | number | boolean>) => void;
    schemaMap: Record<BlockType, Record<string, Field>>;
    className?: string;
}

export default function EditorSidebar({
    blocks,
    openId,
    setOpenId,
    toggleVisibility,
    triggerReset,
    handleUpdateProps,
    schemaMap,
    className,
}: EditorSidebarProps) {
    return (
        <aside className={cn(
            'w-full lg:w-80 border-b lg:border-b-0 lg:border-r flex flex-col bg-white z-20 max-h-[40vh] lg:max-h-none',
            className
        )}>
            <div className="p-4 mb-2">
                <h1 className="font-bold text-gray-900 text-center">Page Editor</h1>
                <p className="text-xs text-gray-500 text-center">Customize your sections</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
                {blocks.map((block) => (
                    <div key={block.id} className={`border rounded-lg mb-3 overflow-hidden transition-all ${block.hidden ? 'bg-gray-100/50' : 'bg-white shadow-sm'}`}>
                        <div
                            onClick={() => setOpenId(openId === block.id ? null : block.id)}
                            className="flex items-center justify-between p-3 cursor-pointer"
                        >
                            <div className={`flex items-center gap-3 transition-opacity ${block.hidden ? 'opacity-50' : 'opacity-100'}`}>
                                {openId === block.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                <span className="font-bold text-xs uppercase tracking-wider text-gray-700">
                                    {block.type} {block.hidden && <span className="text-[10px] lowercase font-normal italic">(hidden)</span>}
                                </span>
                            </div>

                            {/* TOOLBAR KECIL DI KANAN */}
                            <div className="flex gap-3 text-gray-400" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => toggleVisibility(block.id)}
                                    className={`transition-colors ${block.hidden ? 'text-orange-400' : 'hover:text-blue-500'}`}
                                    title={block.hidden ? "Show Section" : "Hide Section"}
                                >
                                    {block.hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>

                                <button
                                    onClick={() => triggerReset(block.id)}
                                    className="hover:text-red-500 transition-colors"
                                    title="Reset Properties"
                                >
                                    <RotateCcw size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Input editor hanya muncul jika tidak di-hidden dan sedang terbuka */}
                        {openId === block.id && !block.hidden && (
                            <div className="p-4 border-t bg-white">
                                <PropsEditor
                                    schema={schemaMap[block.type]}
                                    value={block.props as Record<string, string>}
                                    onChange={(newProps) => handleUpdateProps(block.id, newProps)}
                                />
                            </div>
                        )}

                        {/* Pesan jika sedang di-hidden */}
                        {openId === block.id && block.hidden && (
                            <div className="p-8 text-center border-t bg-gray-50">
                                <EyeOff size={24} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-xs text-gray-400 font-medium">This section is currently hidden from preview.</p>
                            </div>
                        )}
                    </div>
                ))}

                <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm font-medium hover:bg-white hover:border-gray-300 transition-all">
                    + Add New Section
                </button>
            </div>
        </aside>
    );
}
