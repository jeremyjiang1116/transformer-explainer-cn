import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(path) {
	return readFileSync(join(root, path), 'utf8');
}

function assertIncludes(path, expected) {
	const content = read(path);
	if (!content.includes(expected)) {
		throw new Error(`${path} should include: ${expected}`);
	}
}

function assertExcludes(path, banned) {
	const content = read(path);
	if (content.includes(banned)) {
		throw new Error(`${path} should not include original English copy: ${banned}`);
	}
}

assertIncludes('src/app.html', '<html lang="zh-CN">');
assertIncludes('src/app.html', 'Transformer Explainer：可视化理解 LLM Transformer 模型');
assertExcludes('src/app.html', 'LLM Transformer Model Visually Explained');

assertIncludes('src/utils/i18n.ts', '多层感知机（MLP, Multi-Layer Perceptron）');
assertIncludes('src/utils/i18n.ts', '词元（Token）');
assertIncludes('src/utils/i18n.ts', '自注意力（Self-Attention）');

assertIncludes('src/components/InputForm.svelte', '生成');
assertIncludes('src/components/InputForm.svelte', '示例');
assertIncludes('src/components/InputForm.svelte', '输入你自己的英文提示词');
assertExcludes('src/components/InputForm.svelte', 'Test your own input text');
assertExcludes('src/components/InputForm.svelte', 'Generate');

assertIncludes('src/components/Embedding.svelte', 'Embedding');
assertIncludes('src/components/Embedding.svelte', 'Tokenization');
assertIncludes('src/components/Embedding.svelte', 'Token Embedding');
assertIncludes('src/components/Attention.svelte', '多头自注意力');
assertIncludes('src/components/LinearSoftmax.svelte', '输出概率');
assertIncludes('src/components/SubsequentBlocks.svelte', '个相同的');
assertIncludes('src/components/Operation.svelte', 'Layer Normalization');

console.log('Localization checks passed.');
