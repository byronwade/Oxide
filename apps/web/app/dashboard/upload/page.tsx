"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, DollarSign, Image as ImageIcon, Video, Tag, Globe, Eye, EyeOff, X, Plus, CheckCircle, AlertCircle, ChevronLeft, Save, Send } from "lucide-react";

interface GameUploadData {
	title: string;
	slug: string;
	shortDescription: string;
	description: string;
	classification: "games" | "tools" | "comics" | "books";
	projectKind: "downloadable" | "html" | "flash" | "java" | "android";
	releaseStatus: "released" | "early-access" | "prototype" | "canceled";
	pricing: {
		type: "free" | "paid" | "donate";
		price: number;
		suggestedDonation: number;
	};
	files: File[];
	genre: string;
	tags: string[];
	aiGenerated: "yes" | "no";
	appStoreLinks: {
		steam?: string;
		apple?: string;
		google?: string;
		amazon?: string;
		windows?: string;
	};
	customNoun: string;
	community: "disabled" | "comments" | "discussion";
	visibility: "draft" | "restricted" | "public";
	coverImage?: File;
	trailerUrl: string;
	screenshots: File[];
}

const GENRES = ["Action", "Adventure", "Arcade", "Card Game", "Educational", "Fighting", "Interactive Fiction", "Platformer", "Puzzle", "Racing", "Rhythm", "Role Playing", "Shooter", "Simulation", "Sports", "Strategy", "Survival"];

const SUGGESTED_TAGS = ["2D", "3D", "Abstract", "Atmospheric", "Casual", "Challenging", "Colorful", "Dark", "Fast-Paced", "Fantasy", "Horror", "Minimalist", "Multiplayer", "Narrative", "Pixel Art", "Procedural", "Retro", "Sci-fi", "Singleplayer", "Surreal", "Top-Down", "Turn-Based", "Voxel"];

export default function GameUploadPage() {
	const [formData, setFormData] = useState<GameUploadData>({
		title: "",
		slug: "",
		shortDescription: "",
		description: "",
		classification: "games",
		projectKind: "downloadable",
		releaseStatus: "released",
		pricing: { type: "free", price: 0, suggestedDonation: 2.0 },
		files: [],
		genre: "",
		tags: [],
		aiGenerated: "no",
		appStoreLinks: {},
		customNoun: "",
		community: "disabled",
		visibility: "draft",
		trailerUrl: "",
		screenshots: [],
	});

	const [currentStep, setCurrentStep] = useState(1);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [tagInput, setTagInput] = useState("");

	const totalSteps = 6;
	const progressPercentage = (currentStep / totalSteps) * 100;

	const updateFormData = (updates: Partial<GameUploadData>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
	};

	const handleTitleChange = (title: string) => {
		updateFormData({
			title,
			slug: generateSlug(title),
		});
	};

	const addTag = (tag: string) => {
		if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
			updateFormData({ tags: [...formData.tags, tag] });
		}
	};

	const removeTag = (tagToRemove: string) => {
		updateFormData({ tags: formData.tags.filter((tag) => tag !== tagToRemove) });
	};

	const handleFileUpload = (files: FileList | null, type: "game" | "cover" | "screenshots") => {
		if (!files) return;

		const fileArray = Array.from(files);

		if (type === "game") {
			updateFormData({ files: fileArray });
		} else if (type === "cover") {
			updateFormData({ coverImage: fileArray[0] });
		} else if (type === "screenshots") {
			updateFormData({ screenshots: [...formData.screenshots, ...fileArray] });
		}
	};

	const handleSubmit = async () => {
		setIsUploading(true);
		setUploadProgress(0);

		// Simulate upload progress
		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsUploading(false);
					return 100;
				}
				return prev + 10;
			});
		}, 500);
	};

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-8 py-12">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0" asChild>
							<Link href="/dashboard">
								<ChevronLeft className="w-4 h-4 mr-1" />
								Back to Dashboard
							</Link>
						</Button>
					</div>
					<div className="flex items-center space-x-3">
						<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
							<Save className="w-4 h-4 mr-2" />
							Save Draft
						</Button>
					</div>
				</div>

				{/* Progress Header */}
				<Card className="bg-gray-900/50 border-gray-800 mb-8">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-white">Upload New Game</CardTitle>
								<p className="text-gray-400 text-sm">
									Step {currentStep} of {totalSteps}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-400">Progress</p>
								<p className="text-lg font-bold text-rust-400">{Math.round(progressPercentage)}%</p>
							</div>
						</div>
						<Progress value={progressPercentage} className="mt-4" />
					</CardHeader>
				</Card>

				{/* Step Content */}
				{currentStep === 1 && <BasicInfoStep formData={formData} updateFormData={updateFormData} onTitleChange={handleTitleChange} />}

				{currentStep === 2 && <ClassificationStep formData={formData} updateFormData={updateFormData} />}

				{currentStep === 3 && <PricingStep formData={formData} updateFormData={updateFormData} />}

				{currentStep === 4 && <FilesStep formData={formData} onFileUpload={handleFileUpload} />}

				{currentStep === 5 && <DetailsStep formData={formData} updateFormData={updateFormData} addTag={addTag} removeTag={removeTag} tagInput={tagInput} setTagInput={setTagInput} />}

				{currentStep === 6 && <MediaStep formData={formData} updateFormData={updateFormData} onFileUpload={handleFileUpload} />}

				{/* Navigation */}
				<div className="flex items-center justify-between mt-8">
					<Button variant="outline" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1} className="border-gray-600 text-gray-300 hover:bg-gray-800">
						Previous
					</Button>

					<div className="flex items-center space-x-2">
						{Array.from({ length: totalSteps }, (_, i) => (
							<div key={i} className={`w-2 h-2 rounded-full ${i + 1 <= currentStep ? "bg-rust-600" : "bg-gray-600"}`} />
						))}
					</div>

					{currentStep < totalSteps ? (
						<Button onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))} className="bg-rust-600 hover:bg-rust-700 text-white">
							Next
						</Button>
					) : (
						<Button onClick={handleSubmit} disabled={isUploading} className="bg-green-600 hover:bg-green-700 text-white">
							{isUploading ? (
								<>
									<Upload className="w-4 h-4 mr-2 animate-spin" />
									Publishing... {uploadProgress}%
								</>
							) : (
								<>
									<Send className="w-4 h-4 mr-2" />
									Publish Game
								</>
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

// Step Components
function BasicInfoStep({ formData, updateFormData, onTitleChange }: { formData: GameUploadData; updateFormData: (updates: Partial<GameUploadData>) => void; onTitleChange: (title: string) => void }) {
	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardHeader>
				<CardTitle className="text-white">Basic Information</CardTitle>
				<p className="text-gray-400">Tell us about your game</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="title" className="text-white">
							Title *
						</Label>
						<Input id="title" value={formData.title} onChange={(e) => onTitleChange(e.target.value)} className="bg-gray-800 border-gray-700 text-white" placeholder="Your game title" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="slug" className="text-white">
							Project URL
						</Label>
						<div className="flex">
							<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-800 text-gray-400 text-sm">launchbeacon.com/</span>
							<Input id="slug" value={formData.slug} onChange={(e) => updateFormData({ slug: e.target.value })} className="bg-gray-800 border-gray-700 text-white rounded-l-none" placeholder="game-url" />
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="shortDescription" className="text-white">
						Short description or tagline
					</Label>
					<Textarea id="shortDescription" value={formData.shortDescription} onChange={(e) => updateFormData({ shortDescription: e.target.value })} className="bg-gray-800 border-gray-700 text-white" placeholder="A brief description shown when we link to your project" rows={2} />
					<p className="text-xs text-gray-500">Shown when we link to your project. Avoid duplicating your project's title</p>
				</div>
			</CardContent>
		</Card>
	);
}

function ClassificationStep({ formData, updateFormData }: { formData: GameUploadData; updateFormData: (updates: Partial<GameUploadData>) => void }) {
	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardHeader>
				<CardTitle className="text-white">Classification</CardTitle>
				<p className="text-gray-400">What type of project are you uploading?</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<Label className="text-white">What are you uploading? *</Label>
					<RadioGroup value={formData.classification} onValueChange={(value) => updateFormData({ classification: value as GameUploadData["classification"] })}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="games" id="games" />
							<Label htmlFor="games" className="text-white">
								Games — A piece of software you can play
							</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="space-y-4">
					<Label className="text-white">Kind of project *</Label>
					<RadioGroup value={formData.projectKind} onValueChange={(value) => updateFormData({ projectKind: value as GameUploadData["projectKind"] })}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="downloadable" id="downloadable" />
							<Label htmlFor="downloadable" className="text-white">
								Downloadable — You only have files to be downloaded
							</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="space-y-4">
					<Label className="text-white">Release status *</Label>
					<RadioGroup value={formData.releaseStatus} onValueChange={(value) => updateFormData({ releaseStatus: value as GameUploadData["releaseStatus"] })}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="released" id="released" />
							<Label htmlFor="released" className="text-white">
								Released — Project is complete, but might receive some updates
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="early-access" id="early-access" />
							<Label htmlFor="early-access" className="text-white">
								Early Access — Project is playable but still in development
							</Label>
						</div>
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	);
}

function PricingStep({ formData, updateFormData }: { formData: GameUploadData; updateFormData: (updates: Partial<GameUploadData>) => void }) {
	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardHeader>
				<CardTitle className="text-white">Pricing</CardTitle>
				<p className="text-gray-400">Set your pricing model</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<RadioGroup
					value={formData.pricing.type}
					onValueChange={(value) =>
						updateFormData({
							pricing: { ...formData.pricing, type: value as "free" | "paid" | "donate" },
						})
					}
				>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="free" id="free" />
							<Label htmlFor="free" className="text-white">
								Free
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="donate" id="donate" />
							<Label htmlFor="donate" className="text-white">
								$0 or donate
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="paid" id="paid" />
							<Label htmlFor="paid" className="text-white">
								Paid
							</Label>
						</div>
					</div>
				</RadioGroup>

				{formData.pricing.type === "donate" && (
					<div className="space-y-2 ml-6">
						<Label htmlFor="suggestedDonation" className="text-white">
							Suggested donation
						</Label>
						<div className="flex items-center space-x-2">
							<span className="text-gray-400">$</span>
							<Input
								id="suggestedDonation"
								type="number"
								step="0.01"
								min="0"
								value={formData.pricing.suggestedDonation}
								onChange={(e) =>
									updateFormData({
										pricing: { ...formData.pricing, suggestedDonation: parseFloat(e.target.value) || 0 },
									})
								}
								className="bg-gray-800 border-gray-700 text-white w-24"
							/>
						</div>
					</div>
				)}

				{formData.pricing.type === "paid" && (
					<div className="space-y-2 ml-6">
						<Label htmlFor="price" className="text-white">
							Price
						</Label>
						<div className="flex items-center space-x-2">
							<span className="text-gray-400">$</span>
							<Input
								id="price"
								type="number"
								step="0.01"
								min="0"
								value={formData.pricing.price}
								onChange={(e) =>
									updateFormData({
										pricing: { ...formData.pricing, price: parseFloat(e.target.value) || 0 },
									})
								}
								className="bg-gray-800 border-gray-700 text-white w-24"
							/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function FilesStep({ formData, onFileUpload }: { formData: GameUploadData; onFileUpload: (files: FileList | null, type: "game" | "cover" | "screenshots") => void }) {
	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardHeader>
				<CardTitle className="text-white">Game Files</CardTitle>
				<p className="text-gray-400">Upload your game files</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-rust-500 transition-colors">
					<Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg font-semibold text-white mb-2">Upload Game Files</h3>
					<p className="text-gray-400 mb-4">Drag and drop your files here or click to browse</p>
					<input type="file" multiple onChange={(e) => onFileUpload(e.target.files, "game")} className="hidden" id="game-files" accept=".zip,.rar,.7z,.exe,.dmg,.app" />
					<Label htmlFor="game-files" className="cursor-pointer">
						<Button className="bg-rust-600 hover:bg-rust-700 text-white">Choose Files</Button>
					</Label>
					<p className="text-xs text-gray-500 mt-2">File size limit: 1 GB. Contact us if you need more space</p>
				</div>

				{formData.files.length > 0 && (
					<div className="space-y-2">
						<h4 className="text-white font-semibold">Uploaded Files:</h4>
						{formData.files.map((file, index) => (
							<div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded">
								<div className="flex items-center space-x-3">
									<FileText className="w-4 h-4 text-gray-400" />
									<span className="text-white">{file.name}</span>
									<span className="text-gray-400 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
								</div>
								<Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
									<X className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function DetailsStep({ formData, updateFormData, addTag, removeTag, tagInput, setTagInput }: { formData: GameUploadData; updateFormData: (updates: Partial<GameUploadData>) => void; addTag: (tag: string) => void; removeTag: (tag: string) => void; tagInput: string; setTagInput: (value: string) => void }) {
	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardHeader>
				<CardTitle className="text-white">Game Details</CardTitle>
				<p className="text-gray-400">Describe your game and add metadata</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="description" className="text-white">
						Description *
					</Label>
					<Textarea id="description" value={formData.description} onChange={(e) => updateFormData({ description: e.target.value })} className="bg-gray-800 border-gray-700 text-white min-h-[120px]" placeholder="This will make up the content of your game page..." />
				</div>

				<div className="space-y-2">
					<Label htmlFor="genre" className="text-white">
						Genre
					</Label>
					<Select value={formData.genre} onValueChange={(value) => updateFormData({ genre: value })}>
						<SelectTrigger className="bg-gray-800 border-gray-700 text-white">
							<SelectValue placeholder="Select the category that best describes your game" />
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-700">
							{GENRES.map((genre) => (
								<SelectItem key={genre} value={genre.toLowerCase()}>
									{genre}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label className="text-white">Tags ({formData.tags.length}/10)</Label>
					<div className="flex flex-wrap gap-2 mb-2">
						{formData.tags.map((tag) => (
							<Badge key={tag} className="bg-rust-600 text-white cursor-pointer hover:bg-rust-700" onClick={() => removeTag(tag)}>
								{tag} <X className="w-3 h-3 ml-1" />
							</Badge>
						))}
					</div>
					<div className="flex space-x-2">
						<Input
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addTag(tagInput);
									setTagInput("");
								}
							}}
							className="bg-gray-800 border-gray-700 text-white"
							placeholder="Add a tag and press Enter"
						/>
						<Button
							onClick={() => {
								addTag(tagInput);
								setTagInput("");
							}}
							variant="outline"
							className="border-gray-600 text-gray-300 hover:bg-gray-800"
						>
							<Plus className="w-4 h-4" />
						</Button>
					</div>
					<div className="flex flex-wrap gap-1 mt-2">
						{SUGGESTED_TAGS.filter((tag) => !formData.tags.includes(tag))
							.slice(0, 15)
							.map((tag) => (
								<Button key={tag} variant="ghost" size="sm" onClick={() => addTag(tag)} className="text-xs text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-auto">
									{tag}
								</Button>
							))}
					</div>
				</div>

				<div className="space-y-4">
					<Label className="text-white">AI generation disclosure</Label>
					<RadioGroup value={formData.aiGenerated} onValueChange={(value) => updateFormData({ aiGenerated: value as "yes" | "no" })}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="yes" id="ai-yes" />
							<Label htmlFor="ai-yes" className="text-white">
								Yes — This project contains the output of Generative AI
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="no" id="ai-no" />
							<Label htmlFor="ai-no" className="text-white">
								No — This project does not contain the output of Generative AI
							</Label>
						</div>
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	);
}

function MediaStep({ formData, updateFormData, onFileUpload }: { formData: GameUploadData; updateFormData: (updates: Partial<GameUploadData>) => void; onFileUpload: (files: FileList | null, type: "game" | "cover" | "screenshots") => void }) {
	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardHeader>
				<CardTitle className="text-white">Media & Screenshots</CardTitle>
				<p className="text-gray-400">Add visuals to showcase your game</p>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Cover Image */}
				<div className="space-y-2">
					<Label className="text-white">Cover Image *</Label>
					<p className="text-xs text-gray-500">Required (Minimum: 315x250, Recommended: 630x500)</p>
					<div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-rust-500 transition-colors">
						<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
						<input type="file" onChange={(e) => onFileUpload(e.target.files, "cover")} className="hidden" id="cover-image" accept="image/*" />
						<Label htmlFor="cover-image" className="cursor-pointer">
							<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
								Upload Cover Image
							</Button>
						</Label>
					</div>
					{formData.coverImage && <p className="text-sm text-green-400">✓ {formData.coverImage.name} uploaded</p>}
				</div>

				{/* Trailer */}
				<div className="space-y-2">
					<Label htmlFor="trailer" className="text-white">
						Gameplay video or trailer
					</Label>
					<Input id="trailer" value={formData.trailerUrl} onChange={(e) => updateFormData({ trailerUrl: e.target.value })} className="bg-gray-800 border-gray-700 text-white" placeholder="https://www.youtube.com/watch?v=..." />
					<p className="text-xs text-gray-500">Provide a link to YouTube or Vimeo</p>
				</div>

				{/* Screenshots */}
				<div className="space-y-2">
					<Label className="text-white">Screenshots</Label>
					<p className="text-xs text-gray-500">Upload 3 to 5 for best results</p>
					<div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-rust-500 transition-colors">
						<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
						<input type="file" multiple onChange={(e) => onFileUpload(e.target.files, "screenshots")} className="hidden" id="screenshots" accept="image/*" />
						<Label htmlFor="screenshots" className="cursor-pointer">
							<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
								Upload Screenshots
							</Button>
						</Label>
					</div>
					{formData.screenshots.length > 0 && (
						<div className="space-y-1">
							{formData.screenshots.map((file, index) => (
								<p key={index} className="text-sm text-green-400">
									✓ {file.name}
								</p>
							))}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
