// gh.ts
import { Octokit } from 'octokit';
import type { UsersData } from '@/types';

const repo = {
    owner: 'StageUNIPD',
    repo: 'data',
    path: 'data/users.json',
};

const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

// --- GET users.json ---
export async function fetchUsers(): Promise<UsersData> {
    const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        ...repo,
    });

    const content = Buffer.from((res.data as { content: string }).content, 'base64').toString();
    return JSON.parse(content) as UsersData;
}

// --- ADD new user ---
export async function addUser(newUser: { username: string; school: string, date: Date }) {
    // 1. Fetch current file
    const file = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        ...repo,
    });

    const fileData = file.data as { content: string; sha: string };
    const sha = fileData.sha;
    const existingContent = Buffer.from(fileData.content, 'base64').toString();
    const users: UsersData = JSON.parse(existingContent);

    // 2. Prevent duplicates
    if (users.find((u) => u.username === newUser.username)) {
        throw new Error('Username already exists');
    }

    // 3. Add and push
    users.push(newUser);

    const updatedContent = Buffer.from(JSON.stringify(users, null, 2)).toString('base64');

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        ...repo,
        message: `Add user ${newUser.username}`,
        content: updatedContent,
        sha,
    });
}
