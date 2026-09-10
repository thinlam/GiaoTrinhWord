import type {
  WritingIssue
} from "../types/checker.types";

let currentIssues:
  WritingIssue[] = [];

export function setIssues(
  issues: WritingIssue[]
): void {

  currentIssues =
    [...issues];
}

export function getIssues():
WritingIssue[] {

  return currentIssues;
}

export function removeIssue(
  issueId: string
): void {

  currentIssues =
    currentIssues.filter(
      issue =>
        issue.id !==
        issueId
    );
}

export function clearIssues():
void {

  currentIssues = [];
}